# cloudwatch-graphs

`cloudwatch-graphs` is a Node.js app that displays Cloudwatch metrics on a clean and simple front end. At the moment, it only supports the retrieval of metrics using the namespace and the metric name.

### Running

You'll need to set your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables. You'll also need Node.js installed, as well as the dependencies (`npm install`). Then you can run:

    $ node server.js

And the site will appear on port `7080`.

### Configuration

All the configuration happens in `config.json`. The available parameters are:

* `title`: Displayed as the title at the top of the page.
* `awsRegion`: The AWS region to connect to.
* `hoursToShow`: The number of hours of data to show.
* `period`: The number of seconds between sample points. For example, 60 means that a point will be plotted for every minute.
* `metrics`: An array of objects that describe the metrics to plot. Each object should include:
  * `title`: The name of the metric.
  * `namespace`: The namespace of the metric.
  * `metric`: The name of the metric.

