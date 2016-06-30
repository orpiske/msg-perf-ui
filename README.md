# Messaging Performance UI

A simple website to display performance test data. It can be used along with
[msg-perf-tool](https://github.com/orpiske/msg-perf-tool).

Requirements
-------------
* [ElasticSearch](https://www.elastic.co/)


Basic Setup
-------------

You need a ElasticSearch instance. You can download ElasticSearch from [here]. Once
downloaded and installed, you need to configure it to allow Cross Origin Resource
Sharing (CORS). To do so, add the following to the configuration file in
config/elasticsearch.yml:

```
http.cors.allow-origin: "*"
http.cors.enabled: true
```

For production usage, it may also be necessary to configure it to listen on all
interfaces (or, at least, the one desired). You can do so by setting the following
parameter:

```
network.host: 0.0.0.0
```


Development
-------------
## Running local copy

To run local copy in development mode, execute:
```bash
gulp serve
```
This script should automatically open template in your default browser.

To run local copy in production mode, execute:
```bash
gulp serve:dist
```
For addition information about build, please check out [this angular generator](https://github.com/Swiip/generator-gulp-angular)


License
-------------
<a href=/LICENSE.txt target="_blank">MIT</a> license.
