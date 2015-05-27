"use strict";
var fs = require("fs");
var java = require("java");
var argv = require('yargs').argv;
java.classpath.push("lib/lucene-core-3.6.2.jar");
java.classpath.push("lib/neo4j-kernel-2.2.1.jar");
java.classpath.push("lib/neo4j-lucene-index-2.2.1.jar");
java.classpath.push("lib/neo4j-primitive-collections-2.2.1.jar");
java.classpath.push("lib/neo4j-io-2.2.1.jar");
java.classpath.push("lib/neo4j-graphviz-2.2.1.jar");
java.classpath.push("lib/neo4j-unsafe-2.2.1.jar");

if (argv.help) {
    console.log("Neo4j graphviz generator. Prints graphviz dot notation representing the full neo4j db to stdout.");
    console.log("USAGE: " + argv.$0 + " neo4j/store/dir");
    console.log("WHERE");
    console.log("neo4j/store/dir\t\tis the path to where the neo4j graph store is located. This parameter is mandatory.");
    process.exit()
}
if (argv._.length < 1) {
    console.log("Need to specify neo4j/store/dir.");
    process.exit(1);
}
var storeDir = argv._[0];
fs.lstat(storeDir, function (err, stats) {
    if (err || !stats.isDirectory()) {
        console.log(argv._[0] + " is not a valid directory.");
        process.exit(1);
    }
    else {
        var graphFactory = java.newInstanceSync("org.neo4j.graphdb.factory.GraphDatabaseFactory");
        graphFactory.newEmbeddedDatabase(storeDir, function (err, graphDb) {
            if (err) {
                console.error(err);
                process.exit(1);
            } else {
                var tx = graphDb.beginTxSync();
                var walker = java.import("org.neo4j.walk.Walker");
                var outStream = java.newInstanceSync("java.io.ByteArrayOutputStream");
                var graphviz = java.newInstanceSync("org.neo4j.visualization.graphviz.GraphvizWriter");
                var w = walker.fullGraphSync(graphDb);
                graphviz.emitSync(outStream, w);
                console.log(outStream.toStringSync());
                tx.successSync();
                tx.finishSync();
                graphDb.shutdown();
            }
        });
    }
});            