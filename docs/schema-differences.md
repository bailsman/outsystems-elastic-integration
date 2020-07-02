# Diferences Between Engineering and DevOps Schema

## Table of Contents
1. [Global](#global)
2. [General Logs](#general-logs)
3. [Error Logs](#error-logs)
4. [Integration Logs](#integration-logs)
5. [Mobile Request Logs](#mobile-request-logs)
6. [Request Events Logs](#request-events-logs)
7. [Web Service Logs](#web-service-logs)
8. [Web Reference Logs](#web-reference-logs)
9. [Web Requests Logs](#web-requests-logs)
10. [Extension Logs](#extension-logs)
11. [Screen Logs](#screen-logs)
12. [Timer Logs](#timer-logs)

## Global

Both Engineering and DevOps have sets of fields that are present for every log type, but have no correspondence (N/A) in the other team's schema.

Engineering | DevOps
--- | ---
`agent.ephemeral_id` of type `keyword` | N/A
`agent.hostname` of type `keyword` | N/A
`agent.id` of type `keyword` | N/A
`agent.name` of type `keyword` | N/A
`agent.type` of type `keyword` | N/A
`agent.version` of type `keyword` | N/A
`host.name` of type `keyword` | N/A
`outsystems.activation_code` of type `keyword` | N/A
`outsystems.environment_orn` of type `keyword` | N/A
`outsystems.environment_type` of type `keyword` | N/A
`outsystems.machine_type` of type `keyword` | N/A
`outsystems.serial_number` of type `keyword` | N/A
`outsystems.machine_orn` of type `keyword` | N/A
`outsystems.infrastructure_orn` of type `keyword` | N/A
`outsystems.platform_version` of type `keyword` | N/A
`type` of type `keyword` | N/A
N/A | `import.latency` of type `long`
N/A | `log.data_source` of type `keyword` (equivalent to Engineering `type` filed)
N/A | `outsystems.location_name` of type `keyword`
N/A | `outsystems.customer_name` of type `keyword`
N/A | `outsystems.environment_name` of type `keyword`

## General Logs

Engineering | DevOps
--- | ---
`application.name` of type `text` with nested field `keyword` | `application.name` of type `keyword`

## Error Logs

Engineering | DevOps
--- | ---
`id` of type `keyword` | N/A
`user_name` of type `keyword` | N/A
N/A | `error_id` of type `keyword`

## Integration Logs

Engineering | DevOps
--- | ---
`integration.duration` of type `long` | `duration` of type `long`
`id` of type `keyword` | N/A
`source` of type `keyword` | N/A
~~x~~ `application.endpoint_key` of type `keyword` | `application.endpoint_name` of type `keyword`
N/A | `duration_class` of type `keyword`
N/A | `application.client_ip` of type `keyword`

## Mobile Request Logs

Engineering | DevOps
--- | ---
`application.endpoint_key` of type `keyword` | N/A
`id` of type `keyword` | N/A
`source` of type `keyword` | N/A
`mobile.executor` of type `keyword` | N/A
`mobile.duration` of type `long` | `duration` of type `long`
N/A | `application.endpoint_name` of type `keyword`
N/A | `application.client_ip` of type `keyword`
N/A | `mobile_request.id` of type `keyword`

## Request Events Logs

Engineering | DevOps
--- | ---
`application.espace_id` of type `keyword` | N/A
`application.espace_name` of type `keyword` | N/A
`application.screen_name` of type `keyword` | N/A
`error_id` of type `keyword` | N/A
`id` of type `keyword` | N/A
`login_id` of type `keyword` | N/A
`mobile.executor` of type `keyword` | N/A
`mobile.duration` of type `long` | N/A
`source` of type `keyword` | N/A
`tenant_id` of type `keyword` | N/A
`user_name` of type `keyword` | N/A
N/A | `application.tenant_name` of type `keyword`
N/A | `application.tenant_key` of type `keyword`
N/A | `application.endpoint_name` of type `keyword`
N/A | `application.module_key` of type `keyword`
N/A | `application.screen_resolution` of type `keyword`
N/A | `application.environment.name` of type `keyword`
N/A | `application.environment.key` of type `keyword`
N/A | `application.action_name` of type `keyword`
N/A | `application.frontend_name` of type `keyword`
N/A | `application.client_ip` of type `keyword`
N/A | `application.module_name` of type `keyword`
N/A | `request.total_extension_time` of type `long`
N/A | `request.client_time` of type `long`
N/A | `request.time_to_last_byte` of type `long`
N/A | `request.total_extension_executions` of type `long`
N/A | `request.network_time` of type `long`
N/A | `request.total_query_executions` of type `long`
N/A | `request.time_to_first_byte` of type `long`
N/A | `request.total_consumed_integration_executions` of type `long`
N/A | `request.server_duration` of type `long`
N/A | `request.total_consumed_integration_time_class` of type `keyword`
N/A | `request.total_duration` of type `long`
N/A | `request.load_time` of type `long`
N/A | `request.total_query_time` of type `long`
N/A | `request.total_query_time_class` of type `keyword`
N/A | `request.estimated_server_time` of type `long`
N/A | `request.event_name` of type `keyword`
N/A | `request.total_extension_time_class` of type `keyword`
N/A | `request.event_details` of type `text`
N/A | `request.total_consumed_integration_time` of type `long`
N/A | `request.total_duration_class` of type `keyword`
N/A | `request.group.duration` of type `long`
N/A | `request.group.name` of type `keyword`
N/A | `session.size` of type `long`
N/A | `session.visit_key` of type `keyword`
N/A | `session.acquisition_time` of type `long`
N/A | `session.viewstate_size` of type `long`
N/A | `session.viewstate_size_class` of type `keyword`
N/A | `session.size_class` of type `keyword`
N/A | `session.visitor_key` of type `keyword`
N/A | `session.key` of type `keyword`
N/A | `user_key` of type `keyword`
N/A | `user_agent` of type `text`

## Web Service Logs

Engineering | DevOps
--- | ---
`action` of type `keyword` | N/A
`application.espace_name` of type `keyword` | N/A
`application.endpoint_key` of type `keyword` | N/A
`application.key` of type `keyword` | N/A
`application.name` of type `keyword` | N/A
`id` of type `keyword` | N/A
`original_request_key` of type `keyword` | N/A
`session.id` of type `keyword` | N/A
`source` of type `keyword` | N/A
`user_id` of type `long` | N/A
`web_service.executor` of type `keyword` | N/A
`request.key` of type `keyword` | N/A
N/A | `application_method_name` of type `keyword`
N/A | `error_id` of type `keyword`
N/A | `web_service.name` of type `keyword`
N/A | `application.executor` of type `keyword`
N/A | `application.client_ip` of type `keyword`
N/A | `duration_class` of type `keyword`

## Web Reference Logs

Engineering doesn't have these.

## Web Request Logs

Engineering doesn't have these.

## Extension Logs

Engineering | DevOps
--- | ---
`extension.duration` of type `long` | `duration` of type `long`
N/A | `duration_class` of type `keyword`

## Screen Logs

DevOps doesn't have these.

## Timer Logs

Engineering | DevOps
--- | ---
`should_have_run_at` of type `date` | N/A
`timer.duration` of type `long` | `duration` of type `long`
N/A | `timer.last_run` of type `date`
N/A | `request_event.logic_group` of type `keyword`
N/A | `request_event.subgroup` of type `keyword`
N/A | `request_event.group` of type `keyword`
N/A | `duration_class` of type `keyword`
