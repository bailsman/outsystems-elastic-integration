----------------------------------------------------------------------------------------------------
-- Error
----------------------------------------------------------------------------------------------------
SELECT
	CASE WHEN e.Action_Name='' THEN 'No Action' ELSE e.Action_Name END action_name,
	xa.KEY application_key,
	xa.NAME application_name,
	e.Entrypoint_Name entrypoint_name,
	e.EnvironmentInformation environment_info,
	e.Message error_message,
	e.Espace_Id espace_id,
	xe.NAME espace_name,
	e.id id,
	Instant instant,
	e.Module_Name module_name,
	e.Request_Key request_key,
	e.Server server_name,
	e.Session_Id session_id,
	e.Stack stack_trace,
	e.Tenant_Id tenant_id,
	t.NAME tenant_name,
	e.User_Id user_id
FROM OSADMIN_LOG.oslog_Error e
	LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON e.Tenant_Id = t.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Espace xe ON e.espace_id = xe.ID
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_MODULE xm ON xe.ID=xm.espace_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APP_DEFINITION_MODULE xad ON xm.ID=xad.module_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APPLICATION xa ON xad.application_id=xa.ID
WHERE Instant > sysdate-1/288 -- 5 minutes

----------------------------------------------------------------------------------------------------
-- Extension
----------------------------------------------------------------------------------------------------
SELECT 
    e.Action_Name action_name,
    xa.KEY application_key,
    xa.NAME application_name,
    e.Instant instant,
    e.Duration duration,
    e.Session_Id session_id,
    e.User_Id user_id,
    e.Espace_Id espace_id,
    e.Tenant_Id tenant_id,
    e.Extension_Id extension_id,
    e.Executed_By executed_by,
    e.Error_Id error_id,
    e.Request_Key request_key,
    xe.NAME espace_name,
    t.NAME tenant_name,
    xex.NAME extension_name
FROM OSADMIN_LOG.oslog_Extension e
    LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON e.Tenant_Id = t.ID
    LEFT JOIN OSADMIN_OSPRD1.ossys_Espace xe ON e.espace_id = xe.ID
    LEFT JOIN OSADMIN_OSPRD1.OSSYS_MODULE xm ON xe.ID=xm.espace_id
    LEFT JOIN OSADMIN_OSPRD1.OSSYS_APP_DEFINITION_MODULE xad ON xm.ID=xad.module_id
    LEFT JOIN OSADMIN_OSPRD1.OSSYS_APPLICATION xa ON xad.application_id=xa.ID
    LEFT JOIN OSADMIN_OSPRD1.ossys_Extension xex ON e.Extension_Id=xex.ID
WHERE Instant > sysdate-1/288 -- 5 minutes
		
		
----------------------------------------------------------------------------------------------------
-- General
----------------------------------------------------------------------------------------------------
SELECT
	Action_Name action_name,
	xa.KEY application_key,
	xa.NAME application_name,
	Client_IP client_ip,
	Entrypoint_Name entrypoint_name,
	Error_Id error_id,
	g.Espace_Id espace_id,
	xe.NAME espace_name,
	Instant instant,
	Message message_text,
	Module_Name module_name,
	Request_Key request_key,
	Session_Id session_id,
	g.Tenant_Id tenant_id,
	t.NAME tenant_name,
	User_Id user_id
FROM OSADMIN_LOG.oslog_General g
	LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON g.Tenant_Id = t.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Espace xe ON g.espace_id = xe.ID
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_MODULE xm ON xe.ID=xm.espace_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APP_DEFINITION_MODULE xad ON xm.ID=xad.module_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APPLICATION xa ON xad.application_id=xa.ID
WHERE Instant > sysdate-1/288 -- 5 minutes
		
----------------------------------------------------------------------------------------------------
-- Integration
----------------------------------------------------------------------------------------------------
SELECT
	i.Action action_name,
	xa.KEY application_key,
	xa.NAME application_name,
	d.Detail detail_link,
	d.DetailLabel detail_label,
	i.Duration duration,
	i.Endpoint endpoint_name,
	i.Error_Id error_id,
	i.Espace_Id espace_id,
	xe.NAME espace_name,
	i.Executed_by executed_by,
	i.Id id,
	i.Instant instant,
	i.Is_Expose is_expose,
	d.Message message_text,
	i.Request_Key request_key,
	i.Source source_ip,
	i.Tenant_Id tenant_id,
	i.Type integration_type,
	t.NAME tenant_name
FROM OSADMIN_LOG.oslog_Integration i
	LEFT JOIN OSADMIN_OSPRD1.oslog_Int_Detail d ON i.Id = d.Id
	LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON i.Tenant_Id = t.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Espace xe ON i.espace_id = xe.ID
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_MODULE xm ON xe.ID=xm.espace_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APP_DEFINITION_MODULE xad ON xm.ID=xad.module_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APPLICATION xa ON xad.application_id=xa.ID
WHERE Instant > sysdate-1/288 -- 5 minutes

----------------------------------------------------------------------------------------------------
-- Mobile Request
----------------------------------------------------------------------------------------------------
SELECT
	mr.Id id,
	mr.Instant instant,
	mr.Espace_Id espace_id,
	mr.Tenant_Id tenant_id,
	mr.Screen screen_name,
	mr.Endpoint endpoint_name,
	mr.Source source_ip,
	mr.Duration duration,
	mr.Executed_by executed_by,
	mr.Error_Id error_id,
	mr.Request_Key request_key,
	mr.Login_Id login_id,
	mr.User_Id user_id,
	xe.NAME espace_name,
	xa.NAME application_name,
	xa.KEY application_key,
	t.NAME tenant_name,
	md.Message message_text,
	md.Detail detail_text,
	md.DetailLabel detail_label
FROM OSADMIN_LOG.oslog_mobile_request mr
	LEFT JOIN OSADMIN_OSPRD1.oslog_MR_Detail md ON mr.Id = md.Id
	LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON mr.Tenant_Id = t.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Espace xe ON mr.espace_id = xe.ID
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_MODULE xm ON xe.ID=xm.espace_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APP_DEFINITION_MODULE xad ON xm.ID=xad.module_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APPLICATION xa ON xad.application_id=xa.ID
WHERE Instant > sysdate-1/288 -- 5 minutes

----------------------------------------------------------------------------------------------------
-- Request Events
----------------------------------------------------------------------------------------------------
SELECT
	re.APPLICATIONKEY application_key,
	re.APPLICATIONNAME application_name,
	re.INSTANT instant,
	re.MODULEKEY module_key,
	re.MODULENAME module_name,
	re.REQUESTKEY request_key,
	re.REQUESTEVENTNAME request_event_name,
	re.EVENTDETAILS event_details
FROM OSADMIN_LOG.oslog_RequestEvent re
WHERE Instant > sysdate-1/288 -- 5 minutes
		
----------------------------------------------------------------------------------------------------
-- Timer
----------------------------------------------------------------------------------------------------
SELECT
	xa.KEY application_key,
	xa.NAME application_name,
	c.Cyclic_Job_Key cyclic_job_key,
	xmc.NAME cyclic_job_name,
	c.Duration duration,
	c.Espace_Id espace_id,
	xe.NAME espace_name,
	c.Error_Id error_id,
	c.Executed_By executed_by,
	c.Instant instant,
	c.Should_Have_Run_At last_run,
	c.Next_Run next_run,
	c.Request_Key request_key,
	c.Tenant_Id tenant_id,
	t.NAME tenant_name
FROM OSADMIN_LOG.oslog_Cyclic_Job c
	LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON c.Tenant_Id = t.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Espace xe ON c.espace_id = xe.ID
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_MODULE xm ON xe.ID=xm.espace_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APP_DEFINITION_MODULE xad ON xm.ID=xad.module_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APPLICATION xa ON xad.application_id=xa.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Cyclic_Job xcc ON c.Cyclic_Job_Key=xcc.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Meta_Cyclic_Job xmc ON c.Cyclic_Job_Key=xmc.SS_KEY
WHERE Instant > sysdate-1/288 -- 5 minutes
		
----------------------------------------------------------------------------------------------------
-- Web Reference
----------------------------------------------------------------------------------------------------
SELECT
	w.Instant instant,
	w.Duration duration,
	w.URL url,
	w.Method method_name,
	w.Espace_Id espace_id,
	w.Tenant_Id tenant_id,
	w.Executed_by executed_by,
	w.Error_Id error_id,
	w.IntegrationLog_Id integr_log_id,
	t.NAME tenant_name
FROM OSADMIN_LOG.oslog_Web_Reference w
	LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON w.Tenant_Id = t.ID
WHERE Instant > sysdate-1/288 -- 5 minutes
		
----------------------------------------------------------------------------------------------------
-- Web Request
----------------------------------------------------------------------------------------------------
SELECT
	s.Access_Mode access_mode,
	s.Action_Name action_name,
	xa.KEY application_key,
	xa.NAME application_name,
	s.Duration duration,
	s.Espace_Id espace_id,
	xe.NAME espace_name,
	s.Executed_By executed_by,
	s.Instant instant,
	s.Msisdn msisdn,
	s.Screen screen_name,
	s.Screen_Type screen_type,
	s.Session_Bytes session_bytes,
	s.Session_Id session_id,
	s.Session_Requests session_requests,
	s.Tenant_Id tenant_id,
	t.NAME tenant_name,
	s.User_Id user_id,
	s.Viewstate_Bytes viewstate_size,
	s.Request_Key request_key,
	s.Client_IP client_ip
FROM OSADMIN_LOG.oslog_Screen s
	LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON s.Tenant_Id = t.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Espace xe ON s.espace_id = xe.ID
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_MODULE xm ON xe.ID=xm.espace_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APP_DEFINITION_MODULE xad ON xm.ID=xad.module_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APPLICATION xa ON xad.application_id=xa.ID
WHERE Instant > sysdate-1/288 -- 5 minutes
		
----------------------------------------------------------------------------------------------------
-- Web Service
----------------------------------------------------------------------------------------------------
SELECT
	xa.KEY application_key,
	xa.NAME application_name,
	w.Client_IP client_ip,
	w.Duration duration,
	w.Error_Id error_id,
	w.Espace_Id espace_id,
	xe.NAME espace_name,
	w.Executed_by executed_by,
	w.Instant instant,
	w.Method method_name,
	w.Tenant_Id tenant_id,
	t.NAME tenant_name,
	w.Name webservice_name
FROM OSADMIN_LOG.oslog_Web_Service w
	LEFT JOIN OSADMIN_OSPRD1.ossys_Tenant t ON w.Tenant_Id = t.ID
	LEFT JOIN OSADMIN_OSPRD1.ossys_Espace xe ON w.espace_id = xe.ID
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_MODULE xm ON xe.ID=xm.espace_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APP_DEFINITION_MODULE xad ON xm.ID=xad.module_id
	LEFT JOIN OSADMIN_OSPRD1.OSSYS_APPLICATION xa ON xad.application_id=xa.ID
WHERE Instant > sysdate-1/288 -- 5 minutes

