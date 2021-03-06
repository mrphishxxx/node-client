// Generated by IcedCoffeeScript 1.7.1-c
(function() {
  var ArgumentParser, Base, Command, PackageJson, add_option_dict, log,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./base').Base;

  log = require('../log');

  ArgumentParser = require('argparse').ArgumentParser;

  add_option_dict = require('./argparse').add_option_dict;

  PackageJson = require('../package').PackageJson;

  exports.Command = Command = (function(_super) {
    __extends(Command, _super);

    function Command() {
      return Command.__super__.constructor.apply(this, arguments);
    }

    Command.prototype.add_subcommand_parser = function(scp) {
      var name, opts, sub;
      opts = {
        aliases: [],
        help: "display help"
      };
      name = "help";
      sub = scp.addParser(name, opts);
      sub.addArgument(["cmd"], {
        nargs: '?',
        help: "the subcommand you want help with"
      });
      return opts.aliases.concat([name]);
    };

    Command.prototype.run = function(cb) {
      var c, p;
      if ((c = this.argv.cmd) != null) {
        if ((p = this.parent.lookup_parser(c)) != null) {
          p.printHelp();
        } else {
          log.error("Command '" + c + "' isn't known");
        }
      } else {
        this.parent.ap.printHelp();
      }
      return cb(null);
    };

    return Command;

  })(Base);

}).call(this);
