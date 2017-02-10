```
POST /activemq-5131-001-2017-02-09/mpt-receiver-latency/_search?size=90
{
    "aggs" : {
      "latency_percentiles" : {
        "percentile_ranks" : {
          "field" : "latency",
          "values" : [100, 500, 900, 1000, 1250, 1500, 1750, 2000, 3000, 5000, 10000, 15000, 20000, 30000, 60000]
        }
      }
    }
}
```
