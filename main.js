let subscribe_button
const subscribe_button_class = "yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap"
function get_subscribe_button()
{
	let shape = document.getElementById("subscribe-button-shape")
	return shape ? shape.getElementsByClassName(subscribe_button_class)[0] : null
}

let like_button
function get_like_button()
{
	return document.getElementsByTagName("like-button-view-model")[0]
}

const pressable_like_button_class = "yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response"
function get_pressable_like_button()
{
	return like_button.getElementsByClassName(pressable_like_button_class)[0]
}

let like_text
const like_text_class = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--segmented-start"
function get_like_text()
{
	return like_button.getElementsByClassName(like_text_class)[0]
}

function handle_subscriptions()
{
	if (subscribe_button)
	{
		if (!subscribe_text) {subscribe_text = subscribe_button.textContent}
	}
	else
	{
		subscribe_button = get_subscribe_button()
	}
}

let subscribe_text
const valid_subscribe_text = "Subscribed"
const valid_like_text = "I like this"

let checking_interval = 5000
let subscribed_only = true

let interval = null
window.onload = function()
{
	window.addEventListener("yt-navigate-start", function()
	{
		subscribe_button = null
		like_button = null
		subscribe_text = null
		like_text = null
	})

	const get_settings = ()=>
	{
		chrome.storage.sync.get(null, function(result)
		{
			checking_interval = result["checking_interval"] !== null ?
				result["checking_interval"] : checking_interval
			subscribed_only = result["subscribed_only"] !== null ?
				result["subscribed_only"] : subscribed_only
			
			if (interval)
			{
				clearInterval(interval)
				interval = setInterval(like, checking_interval)
			}
		})
	}
	get_settings()

	chrome.storage.onChanged.addListener(get_settings);

	interval = setInterval(like, checking_interval)
}
  

function like()
	{
		if (subscribed_only) {handle_subscriptions()}
		if (like_button)
		{
			if (!like_text)
			{
				like_text = get_like_text()
			}

			let subscribtion_requirements = !subscribed_only || subscribe_text===valid_subscribe_text
			let like_requirements = like_text.title === valid_like_text
			if (subscribtion_requirements && like_requirements) 
				{get_pressable_like_button().click()}
		}
		else {like_button = get_like_button()}
	}