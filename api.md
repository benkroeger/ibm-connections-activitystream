## Functions

<dl>
<dt><a href="#serviceFactory">serviceFactory(baseUrl, [params])</a> ⇒ <code><a href="#ActivityStreamService">ActivityStreamService</a></code></dt>
<dd><p>Factory function to create instance of <a href="#ActivityStreamService">ActivityStreamService</a></p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ActivityStreamService">ActivityStreamService</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="serviceFactory"></a>

## serviceFactory(baseUrl, [params]) ⇒ [<code>ActivityStreamService</code>](#ActivityStreamService)
Factory function to create instance of [ActivityStreamService](#ActivityStreamService)

**Kind**: global function  
**Returns**: [<code>ActivityStreamService</code>](#ActivityStreamService) - an activitystream instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| baseUrl | <code>String</code> |  | the base url to reach an IBM Connections OpenSocial application                                   e.g. `https://apps.na.collabserv.com/connections/opensocial/` |
| [params] | <code>Object</code> | <code>{}</code> | Options used to configure plugins and create the oniyi-http-client |

<a name="ActivityStreamService"></a>

## ActivityStreamService : <code>Object</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | the params argument provided to [serviceFactory](#serviceFactory) |


* [ActivityStreamService](#ActivityStreamService) : <code>Object</code>
    * _static_
        * [.community(query, [options], callback)](#ActivityStreamService.community) ⇒ <code>Promise</code>
        * [.eventDetails(query, [options], callback)](#ActivityStreamService.eventDetails) ⇒ <code>Promise</code>
        * [.feed([query], [options], callback)](#ActivityStreamService.feed) ⇒ <code>Promise</code>
        * [.objectHistory(query, [options], callback)](#ActivityStreamService.objectHistory) ⇒ <code>Promise</code>
    * _inner_
        * [~feedCallback](#ActivityStreamService..feedCallback) : <code>function</code>

<a name="ActivityStreamService.community"></a>

### ActivityStreamService.community(query, [options], callback) ⇒ <code>Promise</code>
Retrieves a community specific activitystream
[Details](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.5+API+Documentation#action=openDocument&res_title=Community_specific_feeds_ic55&content=apicontent)

**Kind**: static method of [<code>ActivityStreamService</code>](#ActivityStreamService)  
**Returns**: <code>Promise</code> - If no callback is provided, this method returns a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>Object</code> |  |  |
| query.communityId | <code>String</code> |  | Community UUID of the community feed you wish to view |
| [options] | <code>Object</code> | <code>{}</code> | Any options you want to pass to `httpClient.makeRequest()`                                                      https://github.com/request/request#requestoptions-callback |
| callback | [<code>feedCallback</code>](#ActivityStreamService..feedCallback) |  |  |

<a name="ActivityStreamService.eventDetails"></a>

### ActivityStreamService.eventDetails(query, [options], callback) ⇒ <code>Promise</code>
Retrieves details for a specific event in activitystream
[Details](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.5+API+Documentation#action=openDocument&res_title=General_IBM_Connections_feed_retrieval_ic55&content=apicontent)

**Kind**: static method of [<code>ActivityStreamService</code>](#ActivityStreamService)  
**Returns**: <code>Promise</code> - If no callback is provided, this method returns a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>Object</code> |  |  |
| query.eventId | <code>String</code> |  | id of the event that details should be loaded for |
| [options] | <code>Object</code> | <code>{}</code> | Any options you want to pass to `httpClient.makeRequest()`                                                      https://github.com/request/request#requestoptions-callback |
| callback | [<code>feedCallback</code>](#ActivityStreamService..feedCallback) |  |  |

<a name="ActivityStreamService.feed"></a>

### ActivityStreamService.feed([query], [options], callback) ⇒ <code>Promise</code>
Retrieves feeds from the authenticated user's activitystream in IBM Connections
[Details](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.5+API+Documentation#action=openDocument&res_title=General_IBM_Connections_feed_retrieval_ic55&content=apicontent)

**Kind**: static method of [<code>ActivityStreamService</code>](#ActivityStreamService)  
**Returns**: <code>Promise</code> - If no callback is provided, this method returns a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [query] | <code>Object</code> | <code>{}</code> |  |
| [query.user] | <code>String</code> | <code>@me</code> |  |
| [query.group] | <code>String</code> | <code>@all</code> |  |
| [query.application] | <code>String</code> |  |  |
| [options] | <code>Object</code> | <code>{}</code> | Any options you want to pass to `httpClient.makeRequest()`                                                        https://github.com/request/request#requestoptions-callback |
| callback | <code>ActivityStreamService~callback</code> |  |  |

<a name="ActivityStreamService.objectHistory"></a>

### ActivityStreamService.objectHistory(query, [options], callback) ⇒ <code>Promise</code>
Retrieves history for a specific object in activitystream
[Details](https://www-10.lotus.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=IBM+Connections+5.5+API+Documentation#action=openDocument&res_title=General_IBM_Connections_feed_retrieval_ic55&content=apicontent)

**Kind**: static method of [<code>ActivityStreamService</code>](#ActivityStreamService)  
**Returns**: <code>Promise</code> - If no callback is provided, this method returns a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>Object</code> |  |  |
| query.application | <code>String</code> |  | name of the application that `object` originated from |
| query.appItemId | <code>String</code> |  | id of the object that history should be loaded for |
| [options] | <code>Object</code> | <code>{}</code> | Any options you want to pass to `httpClient.makeRequest()`                                                      https://github.com/request/request#requestoptions-callback |
| callback | [<code>feedCallback</code>](#ActivityStreamService..feedCallback) |  |  |

<a name="ActivityStreamService..feedCallback"></a>

### ActivityStreamService~feedCallback : <code>function</code>
**Kind**: inner typedef of [<code>ActivityStreamService</code>](#ActivityStreamService)  

| Param | Type | Description |
| --- | --- | --- |
| [Error] | <code>Object</code> | any error that might have occurred making the reuqest |
| data | <code>Object</code> | the activitystream feed data |

