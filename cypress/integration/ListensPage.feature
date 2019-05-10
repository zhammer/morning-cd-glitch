Feature: Listens Page
  On the Listens Page, I can see all of the songs that were posted
  to Morning CD since the last sunrise.

  Background:
    Given these tests refer to the following listens
      | id | listenerName  | listenTimeUtc              | note                                                                                           | ianaTimezone     | expectedIanaTimezoneDisplay | song.id                | song.name                                         | song.artistName           | song.albumName                                               | song.imageSmallUrl                                               |
      | 1  | Livia blanc   | 1985-03-05T15:33:05.170327 |                                                                                                | Europe/Rome      | Rome                        | 2irCiCNN2kheis3bdovtQO | Pass This On                                      | The Knife                 | Deep Cuts                                                    | https://i.scdn.co/image/23bd6e12b9adb363670feffbd0a3508fc34284b0 |
      | 2  | Jack c.       | 1985-03-05T15:37:13.190354 |                                                                                                | America/Chicago  | Chicago                     | 0bqO8DJpo7NGf3ibWGerqv | Odalisque                                         | The Decemberists          | Castaways and Cutouts                                        | https://i.scdn.co/image/9db1dd6b6d6b6ef04bb187a6c55b4c02d425252d |
      | 3  | Evan H        | 1985-03-05T15:47:06.790339 | It's great morning music!                                                                      | America/New_York | New York                    | 3Oxz7SOWcyzIKG9bO9jtYT | Sukiyaki                                          | Kyu Sakamoto              | The Best of Kyu Sakamoto                                     | https://i.scdn.co/image/0b7818c240ac73207a31cdf9e4b615d3d3c8362f |
      | 4  | Shula         | 1985-03-05T15:47:17.505461 |                                                                                                | America/New_York | New York                    | 3tv3f29zjhzL3kcvQE8tGl | La Vie En Rose                                    | Lady Gaga                 | A Star Is Born Soundtrack (Without Dialogue)                 | https://i.scdn.co/image/67c3676980675070996bef906389dd4821916d6f |
      | 5  | Patrick topor | 1985-03-05T15:59:26.158501 |                                                                                                | America/New_York | New York                    | 24VY3EhbGj8JPrq1yn3CoO | Going Underground                                 | Buffalo Tom               | Asides From (1988-1999)                                      | https://i.scdn.co/image/e256c9544ef706896afa8ea6ee228d6ea3d1b18a |
      | 6  | Shrek         | 1985-03-05T17:31:00.983858 | It completes me.                                                                               | America/New_York | New York                    | 3cfOd4CMv2snFaKAnMdnvK | All Star                                          | Smash Mouth               | Astro Lounge                                                 | https://i.scdn.co/image/d0c5b45a5c3714268c9f3df88bbd0e7ce81d4ec7 |
      | 7  | The Ross      | 1985-03-05T17:35:44.097046 |                                                                                                | America/New_York | New York                    | 7zecUVb4DCwf42vcv3fcbP | Red Right Hand - Peaky Blinders Theme;Flood Remix | Nick Cave & The Bad Seeds | Red Right Hand (Theme from 'Peaky Blinders')                 | https://i.scdn.co/image/c2a95be08f50d01e187225bf1a0e16727003679d |
      | 8  | nina          | 1985-03-05T17:46:03.360054 | it's been my alarm tone for 8 years. jolts me awake even if i hear it in the middle of the day | America/Chicago  | Chicago                     | 2yxkvnyno37480Hv1wuAee | Shadow Stabbing                                   | Cake                      | Comfort Eagle                                                | https://i.scdn.co/image/8a0fe44b8e134ff5ff0072ddf5abdd47bb472362 |
      | 9  | Armi G        | 1985-03-05T18:20:39.116772 |                                                                                                | America/New_York | New York                    | 6WJAZ2TUnaKUv9aKkOGokD | Ben's My Friend                                   | Sun Kil Moon              | Benji                                                        | https://i.scdn.co/image/c26fa17661521b334673160b0fad6716f7a0f972 |
      | 10 | Skip I.       | 1985-03-05T18:30:10.584488 |                                                                                                | America/New_York | New York                    | 5gNxxQGk2HbGwXM1PaiWH9 | Big River                                         | The Secret Sisters        | Big River                                                    | https://i.scdn.co/image/d861b3f0c3f3ceb95d59f4fb01fea76d383e49c4 |
      | 11 | Amy Laura     | 1985-03-05T19:26:23.024287 | favorite since since I got a cassette of the live version w/ airplane noise in the background  | America/New_York | New York                    | 4Yf0UI6W7OPH2GEaFjSHwg | Good Morning, Heartache                           | Billie Holiday            | The Lady Sings                                               | https://i.scdn.co/image/b4c723d353c024852985f8a6ab6985152ba43f14 |
      | 12 | Mags C.       | 1985-03-05T19:26:45.778480 |                                                                                                | America/New_York | New York                    | 6cjwec9ii5uLK7CDfPBYt1 | Wide Open Spaces                                  | Dixie Chicks              | Wide Open Spaces                                             | https://i.scdn.co/image/d6852b547d080650a4265f0062c8ada145f6a93f |
      | 13 | Yuval         | 1985-03-05T20:41:54.890143 |                                                                                                | America/New_York | New York                    | 4p82pfEa4cayPqXLN6Rhzm | Dramamine                                         | Modest Mouse              | This Is a Long Drive for Someone with Nothing to Think About | https://i.scdn.co/image/f322290ac64d3fc8f1e590fc66f03b2474e90484 |
      | 14 | Chris S       | 1985-03-05T21:06:49.574237 | Funky driving jam                                                                              | America/New_York | New York                    | 7mKkJuVgkR72ozJGvJOTHP | The View                                          | Modest Mouse              | Good News For People Who Love Bad News                       | https://i.scdn.co/image/2e37a10e1a0b3faeab3d8d981d7ab125e66caa94 |
      | 15 | Queso L       | 1985-03-05T21:25:41.754157 | 1975 came out with one of the best albums this year hands down                                 | America/New_York | New York                    | 6WmIyn2fx1PKQ0XDpYj4VR | Love It If We Made It                             | The 1975                  | A Brief Inquiry Into Online Relationships                    | https://i.scdn.co/image/e8883740c2f09cbe13cae7acf6797e6afb3eb558 |

  Scenario: I visit the listens page
    Given it is after sunset
    And listens 1-15 exist
    When I visit "/listens"
    Then I see the title "Here are the first pieces of music people listened to today, from all over the world"
    And I see the listens with the following ids
      | id |
      | 15 |
      | 14 |
      | 13 |
      | 12 |
      | 11 |
      | 10 |
      | 9  |
      | 8  |
      | 7  |
      | 6  |

  Scenario: I visit the listens page at night when no listens were submitted during the day
    Given it is after sunset
    And no listens were submitted today
    When I visit "/listens"
    Then I see the title "Nobody posted a listen to morning.cd today. Check back here later tonight. Morning.cd works all around the world, and it’s daytime somewhere."
    And I don't see any listens

  # There is an error fetching lessons
  # Text for daytime and you haven't submitted a listen
  # Text for nighttime and you haven't submitted a listen so have to tomorrow
  # Go back to question page on sunrise

  Scenario: I scroll down on the listens page to see more listens
    Given it is after sunset
    And listens 1-15 exist
    When I visit "/listens"
    And I scroll to the bottom of the page
    Then I see the more listens loader
    And I see the listens with the following ids
      | id |
      | 15 |
      | 14 |
      | 13 |
      | 12 |
      | 11 |
      | 10 |
      | 9  |
      | 8  |
      | 7  |
      | 6  |
      | 5  |
      | 4  |
      | 3  |
      | 2  |
      | 1  |

  Scenario: I scroll down on the listens page to see more listens but there are none
    Given it is after sunset
    And listens 1-5 exist
    When I visit "/listens"
    And I scroll to the bottom of the page
    Then I don't see the more listens loader
    And I see the listens with the following ids
      | id |
      | 5  |
      | 4  |
      | 3  |
      | 2  |
      | 1  |

