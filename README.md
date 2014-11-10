# cloudwatch-graphs

![](https://www.versioneye.com/user/projects/53f8cb84e09da3f21f000377/badge.svg?style=flat)

`cloudwatch-graphs` is a Node.js app that displays Cloudwatch metrics on a clean and simple front end. At the moment, it only supports the retrieval of metrics using the namespace and the metric name.

![](https://raw.githubusercontent.com/samstarling/cloudwatch-graphs/master/docs/screenshot.png)

### Running

You'll need to set your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables. You'll also need Node.js installed, as well as the dependencies (`npm install`). Then you can run:

    $ node server.js

The application will then appear on port `7080`.

### Configuration

All the configuration happens in `config.json`. A fairly self-explanatory example has been included in this repository.

### Still To-Do

* Work out how to make more meaningful graphs from monotonically-increasing numbers, by turning them into a graph of the rate of change, rather than the raw number.
* Add support for retrieving more complex metrics, or displaying multiple metrics on the same graph.
