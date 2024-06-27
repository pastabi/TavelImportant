# Purpose of this app

This app was created to practice data fetching from different APIs.

At the same time, I think that the idea of an app that will contain all up-to-date important information, as trending news, weather etc. for some location is very helpful for travellers or some other people.

So, maybe, I'll come back to this project at some time in the future.

## Features

- News API
  I use this api for getting news - [https://currentsapi.services/](https://currentsapi.services/)
  Initially I used this one - [https://newsapi.org/](https://newsapi.org/), but after deployment I realized it is free only for local use, so I needed to find something else.
  The initial one worked flawlessly, but the current one is not working so good, returning data only in a half of requests, but at least I can use it on remote server. So for not I decided to stick with it, maybe in the future I will add some more reliable way of getting news.

- Weather API
  I use this api for getting weather - [https://open-meteo.com/](https://open-meteo.com/) The same one I use for geocoding to get location from a query.
  It requires no api-keys, so I very recomend this one for your projects or learning - a lot of functionality and works flawlessly.

- Currency API
  I use this api for getting currency - [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/)
  Works good, but very small amount of requests provided with free plan, around 1500 for a month, so be careful while testing.
