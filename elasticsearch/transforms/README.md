# Elasticsearch Transforms

## How to test and create transforms

You can do it with any HTTP client that can make REST API calls and understand JSON.

Following next, are 2 examples of how to do so, one using `curl`, and the other one using Kibana's `Dev Tools`, for each supported type.

### Test Transforms

Using `curl`:
```
curl -d @pre-query-metrics-request-events-server.json -H 'Content-Type: application/json' -X POST http://localhost:9200/_transform/_preview
```

Using Kibana's `Dev Tools`:
```
POST _transform/_preview
${contents of pre-query-metrics-request-events-server.json file goes here}
```

### Create Transforms

Using `curl`:
```
curl -d @pre-query-metrics-request-events-server.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_transform/pre-query-metrics-request-events-server
```

Using Kibana's `Dev Tools`:
```
PUT _transform/pre-query-metrics-request-events-server
${contents of pre-query-metrics-request-events-server.json file goes here}
```

### Relevant Documentation

* [Elasticsearch Reference: Transforming Data](https://www.elastic.co/guide/en/elasticsearch/reference/current/transforms.html)