let subscribed_only = document.getElementById("subscribed_only")
let checking_interval = document.getElementById("checking_interval")

const handleConfigSubmit = function(event)
{
	event.preventDefault()
	
	let subscribed_only_value = subscribed_only.checked
	let checking_interval_value = checking_interval.value
	
	chrome.storage.sync.set(
	{
		"subscribed_only": subscribed_only_value,
		"checking_interval": checking_interval_value
	}, null)
}
chrome.storage.sync.get(null, function(result)
{
	console.log(result)
	checking_interval.value =
		result["checking_interval"] !== null ? result["checking_interval"] : 5000
	
	subscribed_only.checked =
		result["subscribed_only"] !== null ? result["subscribed_only"] : true
})
document.getElementById("save").addEventListener("click", handleConfigSubmit)