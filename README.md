# Purpose of this app

This app was created to practice useEffect hook, custom hooks and data fetching from different APIs.

At the same time, I think that the idea of an app that will contain all up-to-date important information, as trending news, weather etc. for some specific location is very helpful for travellers or some other people, who need to understand context the specific location is in, or just to learn about a place a little bit better in an easy way.

So, maybe, I'll come back to this project at some time in the future and make it more stable and useful.

## Notes

Getting news can work only in a half of cases because of the specific free API choice.

## Features

#### News API

I use this api for getting news - [https://currentsapi.services/](https://currentsapi.services/)
Initially I used this one - [https://newsapi.org/](https://newsapi.org/), but after deployment I realized it is free only for local use, so I needed to find something else, but similar.
The initial one worked flawlessly, but the current one is not working so good, returning data only in a 50-75% of requests, but at least I can use it on remote server for free. So for not I decided to stick with it, maybe in the future I will add some more reliable way of getting news.

#### Weather API

I use this api for getting weather - [https://open-meteo.com/](https://open-meteo.com/) The same one I use for geocoding to get location from a query.
It requires no api-keys, so I very recomend this one for your projects or learning - a lot of functionality and works flawlessly.

#### Currency API

I use this api for getting currency - [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/)
Works good, but very small amount of requests provided with free plan, around 1500 for a month, so be careful while testing.

## Commented code

Some features in code are commented, because they can be useful, but I decided to not use them for now.

For example: a loading state for displaying location name according to the query. With a reasonable quality internet connection this will take ~0.1-0.2 seconds, so the loading animation every key press is just disruptive and intermittent, which makes UI twitchy, so, after I made it, I decided to disable it. But, maybe in the future I will make the animation to start only after a certain delay, and then the existing code will be helpful.
