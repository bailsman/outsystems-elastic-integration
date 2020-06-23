# Elasticsearch Index Templates

> Warning: You need to apply the ILM Policies before applying the index templates.

## How to apply the index templates

You can do it with any HTTP client that can make REST API calls and understand JSON.

Following next, are 2 examples of how to do so, one using `curl`, and the other one using Kibana's `Dev Tools`, for each supported type.

### Error

Using `curl`:
```
curl -d @error.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_template/os-mon-log-error
```

Using Kibana's `Dev Tools`:
```
PUT _template/os-mon-log-error
${contents of error.json file goes here}
```

### Extension

Using `curl`:
```
curl -d @extension.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_template/os-mon-log-extension
```

Using Kibana's `Dev Tools`:
```
PUT _template/os-mon-log-extension
${contents of extension.json file goes here}
```

### Integration

Using `curl`:
```
curl -d @integration.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_template/os-mon-log-integration
```

Using Kibana's `Dev Tools`:
```
PUT _template/os-mon-log-integration
${contents of integration.json file goes here}
```

### Mobile Request

Using `curl`:
```
curl -d @mobile-request.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_template/os-mon-log-mobile-request
```

Using Kibana's `Dev Tools`:
```
PUT _template/os-mon-log-mobile-request
${contents of mobile-request.json file goes here}
```

### Timer

Using `curl`:
```
curl -d @timer.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_template/os-mon-log-timer
```

Using Kibana's `Dev Tools`:
```
PUT _template/os-mon-log-timer
${contents of timer.json file goes here}
```

### Web Reference

Using `curl`:
```
curl -d @web-reference.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_template/os-mon-log-web-reference
```

Using Kibana's `Dev Tools`:
```
PUT _template/os-mon-log-web-reference
${contents of web-reference.json file goes here}
```

### Web Request

Using `curl`:
```
curl -d @web-request.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_template/os-mon-log-web-request
```

Using Kibana's `Dev Tools`:
```
PUT _template/os-mon-log-web-request
${contents of web-request.json file goes here}
```

### Web Service

Using `curl`:
```
curl -d @web-service.json -H 'Content-Type: application/json' -X PUT http://localhost:9200/_template/os-mon-log-web-service
```

Using Kibana's `Dev Tools`:
```
PUT _template/os-mon-log-web-service
${contents of web-service.json file goes here}
```
