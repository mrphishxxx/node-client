{Base} = require './base'
log = require '../log'
{add_option_dict} = require './argparse'
{E} = require '../err'
{TrackSubSubCommand} = require '../tracksubsub'

##=======================================================================

exports.Command = class Command extends Base

  #----------

  OPTS :
    r :
      alias : "remote"
      action : "storeTrue"
      help : "remotely track by default"
    l : 
      alias : "local"
      action : "storeTrue"
      help : "don't prompt for remote tracking"
    i :
      alias : "id"
      action : "storeTrue"
      help : "ID the user, don't save any state"

  #----------

  add_subcommand_parser : (scp) ->
    opts = 
      aliases : [ "trck" ]
      help : "verify a user's authenticity and optionally track him"
    name = "track"
    sub = scp.addParser name, opts
    add_option_dict sub, @OPTS
    sub.addArgument [ "them" ], { nargs : 1 }
    return opts.aliases.concat [ name ]

  #----------

  run : (cb) ->
    tssc = new TrackSubSubCommand { args : { them : @argv.them[0]}, opts : @argv }
    await tssc.run defer err
    cb err

##=======================================================================
