#!/usr/bin/env python
"""Usage:
  build [options] <in_json_file> <out_xml_file>

Options:
  --log=<lvl>  : CRITICAL|FATAL|ERROR|WARN(ING)|[default: INFO]|DEBUG|NOTSET
"""
from argopt import argopt
import json
import logging
from os import path

__author__ = "Casper da Costa-Luis <casper.dcl@physics.org>"
__version__ = "1.0.0"
__licence__ = "MPLv2.0"
__date__ = "2017"
__license__ = __licence__

XML_FILE = path.join(path.dirname(__file__), "build", "build_template.xml")


def dict2str(d, prefix=''):
    if isinstance(d, dict):
        return '\n'.join(dict2str(v, prefix + k + '.')
                         for (k, v) in d.items())
    else:
        return prefix + d


def flatDict(d):
    log = logging.getLogger(__name__)
    s = dict2str(d)
    log.debug(s)
    return dict(i.rsplit('.', 1) for i in s.split('\n'))


def main():
    args = argopt(__doc__, version=__version__).parse_args()
    logging.basicConfig(level=getattr(logging, args.log, logging.INFO))

    xml = None
    with open(XML_FILE) as fp:
        xml = fp.read()
    jdict = None
    with open(args.in_json_file) as fp:
        jdict = flatDict(json.load(fp))
    for (k, v) in jdict.items():
        xml = xml.replace("{{" + k + "}}", v)
    with open(args.out_xml_file, 'wb') as fp:
        fp.write(xml)


if __name__ == "__main__":
    main()
