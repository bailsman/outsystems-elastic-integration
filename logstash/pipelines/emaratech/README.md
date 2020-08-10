# Emaratech

This is a replica of our current Logstash pipelines, loading data from Service Center exports (csv files) instead of querying the database, for customer Emaratech.

## Elasticsearch

Elasticsearch is a NoSQL database where platform logs are being loaded into.

## Kibana

Kibana is a web client on top of Elasticsearch, used to analyse data in Elasticsearch and build visualisations on top of it.

To access Kibana: https://kb-uhtdbeowykmmo.westeurope.cloudapp.azure.com:5601/
```
User: elastic
Pass: emaratech123!
```
> Don't forget to accept the self-signed certificate.

## Logstash

Logstash is an ETL tool used to load CSV files into Elasticsearch.

To access Logstash:
```
ssh emaratech@emaratech-logstash.westeurope.cloudapp.azure.com
Pass: emaratech123!
```

## CSV

### Load

To load the contents of CSV files into Elasticsearch, these files need to be placed in the Logstash VM, and they need to follow a certain naming convention.

To be able to load CSV files, we need to first make sure each CSV file has a line break at the end. Run the `sanitise.sh` script to add it to all CSV files in a folder. The `sanitise.sh` script is located in the Logstash VM at `/home/emaratech/logstash/csv/`.

Transfer files to the Logstash VM:
```
scp *.csv emaratech@emaratech-logstash.westeurope.cloudapp.azure.com:/home/emaratech/logstash/csv/
Pass: emaratech123!
```

File naming convention:

```
Ext-ErrorLog-*.csv
Int-ErrorLog-*.csv

Example:
Ext-ErrorLog-20200723.csv
Int-ErrorLog-20200723.csv
```

```
Ext-ExtensionLog-*.csv
Int-ExtensionLog-*.csv

Example:
Ext-ExtensionLog-20200723.csv
Int-ExtensionLog-20200723.csv
```

```
Ext-GeneralLog-*.csv
Int-GeneralLog-*.csv

Example:
Ext-GeneralLog-20200723.csv
Int-GeneralLog-20200723.csv
```

```
Ext-IntegrationsLog-*.csv
Int-IntegrationsLog-*.csv

Example:
Ext-IntegrationsLog-20200723.csv
Int-IntegrationsLog-20200723.csv
```

```
Ext-ScreenLog-*.csv
Int-ScreenLog-*.csv

Example:
Ext-ScreenLog-20200723.csv
Int-ScreenLog-20200723.csv
```

```
Ext-TimerLog-*.csv
Int-TimerLog-*.csv

Example:
Ext-TimerLog-20200723.csv
Int-TimerLog-20200723.csv
```

### Findings on parsing the CSV files

* Error events start with a word that can contain the following characters `[A-Za-z0-9_]`, followed by a `;` (the CSV delimiter), hence the RegEx pattern `^(\w)+;` for the multiline codec.
* General events start with an id, followed by a `;` (the CSV delimiter), hence the RegEx pattern `^[0-9]+;` for the multiline codec.
* What really separates each event is a `\r\n` but the multiline codec will _eat_ only the `\n` and leave the `\r` in the event. The csv filter plugin complains about `\r` not being in quotes and issues a failure, that's why we need the `gsub` mutation as the very first thing.
* File needs to have a line break at the end. Run the `sanitise.sh` script to add it to all CSV files in a folder.
* Right after the CSV parsing, we need to add this stupid check `if [instant] == "Instant"` to know if it's the header line, and drop it if it is.
* For `Ext-` files timestamps are in the format `dd-MM-yyyy HH:mm:ss` and for `Int-` files timestamps are in the format `yyyy-MM-dd HH:mm:ss`.

### Pipelines

The resulting Logstash pipelines can be found [here](https://github.com/OutSystems/outsystems-elastic-integration-private/tree/master/logstash/pipelines/emaratech).