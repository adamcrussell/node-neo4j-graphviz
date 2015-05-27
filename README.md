node-neo4j-graphviz
==============

A command line tool for visualizing an entire graph database. If you run
`node node-neo4j-graphviz.js /path/to/graph.db` the entire graph db will
be written to stdout in Graphviz 
[dot notation](http://www.graphviz.org/content/dot-language).
This may then be used by [Graphviz](http://www.graphviz.org),
[Gephi](https://gephi.github.io), and other tools and frameworks; Graphviz dot
is a common format for graphs.

## History

This work is inspired by [neoviz](https://github.com/thobe/neoviz), which itself 
seems to have been inspired by 
[this gist](https://gist.github.com/peterneubauer/2652082) and related 
[blog post]
(http://neo4j.com/blog/graph-this-rendering-your-graph-with-graphviz/).

The [neo4j-shell-tools](https://github.com/jexp/neo4j-shell-tools) project also
seems to be able to output Graphviz dot notation, however, both neoviz and 
neo4j-shell-tools are maven based projects which present themselves as larger 
solutions than perhaps necessary.

This project simply includes the minimal set of .jar files necessary to read a 
neo4j 2.2.1 db and export it in Graphviz dot. The code is JavaScript, using the
[NodeJS Java Bridge API](https://www.npmjs.com/package/java).


## Command-line interface

Run `node node-neo4j-graphviz.js /path/to/graph.db` for the entire graph db to
be written to stdout in Graphviz dot.

Running `node node-neo4j-graphviz.js --help` will show usage information.