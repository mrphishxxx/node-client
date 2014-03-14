// Generated by IcedCoffeeScript 1.7.1-a
(function() {
  var Base, BufferInStream, Command, TrackSubSubCommand, User, dict_union, env, iced, log, make_esc, master_ring, __iced_k, __iced_k_noop,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  iced = require('iced-coffee-script').iced;
  __iced_k = __iced_k_noop = function() {};

  Base = require('./base').Base;

  log = require('../log');

  TrackSubSubCommand = require('../tracksubsub').TrackSubSubCommand;

  BufferInStream = require('iced-spawn').BufferInStream;

  master_ring = require('../keyring').master_ring;

  make_esc = require('iced-error').make_esc;

  User = require('../user').User;

  env = require('../env').env;

  dict_union = require('../util').dict_union;

  exports.Command = Command = (function(_super) {
    __extends(Command, _super);

    function Command() {
      return Command.__super__.constructor.apply(this, arguments);
    }

    Command.OPTS = dict_union(TrackSubSubCommand.OPTS, {
      m: {
        alias: "message",
        help: "provide the message on the command line"
      }
    });

    Command.prototype.add_subcommand_parser = function(scp) {
      var name, opts, sub, _ref;
      _ref = this.get_cmd_desc(), opts = _ref.opts, name = _ref.name;
      sub = scp.addParser(name, opts);
      add_option_dict(sub, this.OPTS);
      sub.addArgument(["them"], {
        nargs: 1,
        help: "the username of the receiver"
      });
      sub.addArgument(["file"], {
        nargs: '?',
        help: "the file to be encrypted"
      });
      return opts.aliases.concat([name]);
    };

    Command.prototype.output_file = function() {
      return null;
    };

    Command.prototype.do_binary = function() {
      return false;
    };

    Command.prototype.do_encrypt = function(cb) {
      var args, err, gargs, o, out, sign_key, tp, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      tp = this.them.fingerprint(true);
      args = ["--encrypt", "-r", tp, "--trust-mode", "always"];
      if (this.do_sign()) {
        sign_key = this.is_self ? this.them : this.tssc.me;
        args.push("--sign", "-u", sign_key.fingerprint(true));
      }
      gargs = {
        args: args
      };
      gargs.quiet = true;
      if ((o = this.output_file())) {
        args.push("--output", o, "--yes");
      }
      if (!this.do_binary()) {
        args.push("-a");
      }
      if (this.argv.message) {
        gargs.stdin = new BufferInStream(this.argv.message);
      } else if (this.argv.file != null) {
        args.push(this.argv.file);
      } else {
        gargs.stdin = process.stdin;
      }
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase/node-client/src/command/encrypt_and_email.iced",
            funcname: "Command.do_encrypt"
          });
          master_ring().gpg(gargs, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                err = arguments[0];
                return out = arguments[1];
              };
            })(),
            lineno: 59
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          (function(__iced_k) {
            if (typeof err === "undefined" || err === null) {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/max/src/keybase/node-client/src/command/encrypt_and_email.iced",
                  funcname: "Command.do_encrypt"
                });
                _this.do_output(out, __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return err = arguments[0];
                    };
                  })(),
                  lineno: 61
                }));
                __iced_deferrals._fulfill();
              })(__iced_k);
            } else {
              return __iced_k();
            }
          })(function() {
            return cb(err);
          });
        };
      })(this));
    };

    Command.prototype.pre_check = function(cb) {
      return cb(null);
    };

    Command.prototype.run = function(cb) {
      var batch, esc, them_un, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      esc = make_esc(cb, "Command::run");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase/node-client/src/command/encrypt_and_email.iced",
            funcname: "Command.run"
          });
          _this.pre_check(esc(__iced_deferrals.defer({
            lineno: 72
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          batch = !_this.argv.message && (_this.argv.file == null);
          them_un = _this.argv.them[0];
          (function(__iced_k) {
            if (them_un === env().get_username()) {
              _this.is_self = true;
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/max/src/keybase/node-client/src/command/encrypt_and_email.iced",
                  funcname: "Command.run"
                });
                User.load_me({
                  secret: true
                }, esc(__iced_deferrals.defer({
                  assign_fn: (function(__slot_1) {
                    return function() {
                      return __slot_1.them = arguments[0];
                    };
                  })(_this),
                  lineno: 77
                })));
                __iced_deferrals._fulfill();
              })(__iced_k);
            } else {
              _this.is_self = false;
              _this.tssc = new TrackSubSubCommand({
                args: {
                  them: them_un
                },
                opts: _this.argv,
                batch: batch
              });
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/max/src/keybase/node-client/src/command/encrypt_and_email.iced",
                  funcname: "Command.run"
                });
                _this.tssc.run(esc(__iced_deferrals.defer({
                  lineno: 81
                })));
                __iced_deferrals._fulfill();
              })(function() {
                return __iced_k(_this.them = _this.tssc.them);
              });
            }
          })(function() {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/max/src/keybase/node-client/src/command/encrypt_and_email.iced",
                funcname: "Command.run"
              });
              _this.do_encrypt(esc(__iced_deferrals.defer({
                lineno: 83
              })));
              __iced_deferrals._fulfill();
            })(function() {
              return cb(null);
            });
          });
        };
      })(this));
    };

    return Command;

  })(Base);

}).call(this);