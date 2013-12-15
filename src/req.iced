request = require 'request'
{env} = require './env'
urlmod = require 'url'
{E} = require './err'

#=================================================

m = (dict, method) ->
  dict.method = method
  dict

#=================================================

class Client 

  constructor : (@headers) ->

  #--------------

  set_headers : (h) -> @headers = h
  get_headers : ()  -> @headers
  add_headers : (d) ->
    @headers or= {}
    (@headers[k] = v for k,v of d)
    true

  #-----------------

  req : ({method, endpoint, args, http_status, kb_status}, cb) ->
    opts = { method, json : true }
    opts.headers = @headers if @headers?

    kb_status or= [ "OK" ]
    http_status or= [ 200 ]

    uri_fields = {
      protocol : "http#{if env().get_no_tls() then '' else 's'}"
      hostname : env().get_host()
      port : env().get_port()
      pathname : [ env().get_api_uri_prefix(), (endpoint + ".json") ].join("/")
    }
    uri_fields.query = args if method in [ 'GET', 'DELETE' ]
    opts.uri = urlmod.format uri_fields
    if method is 'POST'
      opts.body = args

    await request opts, defer err, res, body
    if err? then #noop
    else if not (res.statusCode in http_status) 
      err = new E.HttpError "Got reply #{res.statusCode}"
    else if not (body?.status?.name in kb_status)
      err = new E.KeybaseError "Got status #{JSON.stringify body.status}"

    # Note the swap --- we care more about the body in most cases.
    cb err, body, res

  #-----------------

  post : (args, cb) -> @req m(args, "POST"), cb
  get  : (args, cb) -> @req m(args, "GET") , cb

#=================================================

_cli = new Client()

module.exports =
  client : _cli
  Client : Client
  get    : (args...) -> _cli.get args...
  post   : (args...) -> _cli.post args...
  req    : (args...) -> _cli.req args...

#=================================================

