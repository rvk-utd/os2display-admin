Library events slide
===
Displays events with an image, title, date, location, and a description.

# How to use the slide type
To create a new events slide, choose the "Library Events" slide when creating a new slide.

## Configuration options
There are 5 things that can be configured on the slide, but the only mandatory one is "Event data". 

### Event data
This is where you enter in a url with a data feed that contains the event data.

### Slides in slide
All settings here can be left as they are. They will use some sensible defaults.

Because you often want to display more events than will fit in one slide, the slide type will break the events to display into subslides.

**Number of items pr. slide:**
This number is how many events you want visible at the time. 

**Total number of items to display:**  How many events you want displayed in total. 
 
**Duration of subslides in seconds:**
How long to display each subslide

#### Example
If you choose 10 items total to display and you choose 3 items pr. slide with a subslide duration of 10 seconds, your slide will have 4 subslides that each display for 10 seconds. 3 with 3 events and a last one with just one event.

# Development
The data feed with events can look [like this .xml file](event-data-feed.xml). The code in `SisCronEventSubscriber` parses XML in that format.
