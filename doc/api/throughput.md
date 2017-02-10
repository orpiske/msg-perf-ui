To query for the sender throughput:

```
POST /activemq-5131-001-2017-02-09/mpt-sender-throughput/_search?size=45
{
  "query" : {
    "constant_score" : {
      "filter" : {
        "range" : {
          "ts" : {
		        "gt" : "2017-02-09 18:32:16||+0m-1s",
			      "lt" : "2017-02-09 18:32:16||+0m+15m"
          }
	       }
      }
    }
  }, "sort" : {"ts" : {"order" : "asc"}}
}
```

To query for the receiver throughput:
```
POST /activemq-5131-001-2017-02-09/mpt-receiver-throughput/_search?size=90
{
  "query" : {
    "constant_score" : {
      "filter" : {
        "range" : {
          "ts" : {
		        "gt" : "2017-02-09 18:32:16||+0m-1s",
			      "lt" : "2017-02-09 18:32:16||+0m+15m"
          }
	       }
      }
    }
  }, "sort" : {"ts" : {"order" : "asc"}}
}
```
