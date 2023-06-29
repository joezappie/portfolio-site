import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { injectTheme } from '#decorators/theme.js';

import '#components/city-generator.js';

@customElement('page-projects')
class PageProjects extends LitElement {
  @injectTheme() static styles;
  render() {
    return html`
      <div class="p-box rounded-box mt-4 bg-white">
        <div class="text-accent text-3xl font-bold">Don't Pray to Satan</div>
        <div class="mb-4 text-xl font-light">Created in Unity 5</div>
        <img src="/assets/projects/dpts/splash.png" class="w-full rounded " />

        <h2 class="font-heading mt-4 pb-1">Technologies</h2>
        <div class="flex gap-2">
          <div class="rounded-full bg-neutral-200 px-3 py-1">Unity 3D</div>
          <div class="rounded-full bg-neutral-200 px-3 py-1">C#</div>
          <div class="rounded-full bg-neutral-200 px-3 py-1">Maya</div>
        </div>

        <h2 class="font-heading mt-4 pb-1">Project Description</h2>
        <div class="space-y-4">
          <p>
            The primary goal for this project is to make a procedural town generator and add humans that move around and live in the world autonomously. Each
            person has a family, a career and a personality. The object of the game is to stop the citizens of the town from going to the Temple at near the
            center of the city and praying to Satan. This is done by the player observing the citizens behaviors. All assets including models for this game were
            created by me.
          </p>
        </div>

        <h2 class="font-heading mt-4 pb-1">Town Generation</h2>
        <div class="space-y-4">
          <city-generator class="float-right ml-4 mb-2 aspect-square w-[300px]"></city-generator>
          <p>
            The first thing I knew I wanted to get working was a basic town generator that could create zones for buildings and roads. JavaScript is a great
            prototyping tool so I used it to flesh out my procedure. Since this is a personal project, I wanted to do as much as I could without looking up
            common solutions.
          </p>
          <p>
            I went through several different approaches before landing on my current implementation. To do this I first generate an empty grid and then get all
            the cells in a list and shuffled them. Looping through each cell, I generate a randomly sized rectangle (within parameters) which is used to mark
            the cells in the rectangle with a zone and a unique block ID. The block ID is in case multiple rectangles of the same zone type fall over each, I
            can still put roads to divide it based on its block ID. Once this is done I loop back through the grid and add in the roads.
          </p>
          <p>
            This method works well because after generating the basic city, I can manually go back and add in different zones, such as parks (pink area in
            image), and the roads will automatically form around it. This also produces more unique shaped zones than say something like binary space
            partitioning, which is something I was aiming for. In the code I recreated for Unity, I add in other methods for fixing things I dont want such as
            1x1 zones surrounded by roads.
          </p>
          <div class="clear"></div>
        </div>

        <h2 class="font-heading mt-4 pb-1">Unity Implementation</h2>
        <div class="space-y-4 leading-normal">
          <p>
            My first major milestone was getting roads and houses to spawn on a grid in Unity. The picture below shows the very early stages where I can spawn
            the assets for each in the proper location but they don't know how to interact with their neighboring assets. I did, however, add to the map
            generation a check to see if a tile is next to a road and if not change it to be an empty square. This way forests can be generated at the center of
            zones as buildings can never not be next to a road. The goal is to have more of a town than a city, so this aids nicely to that as towns often have
            large patches of trees and fields.
          </p>
          <img src="/assets/projects/dpts/1.jpg" class="w-full" />
          <p>
            Next I attempted getting roads to rotate in the correct direction by getting the neighboring cells and storing a Y Rotation in the tile. I later
            scrapped this because I realized a simple Y rotation wouldnt help much when it came time to implement intersections. My later approach is using
            seperate generator scripts for Roads, Commercial, Residential and Industrial zones. This way each tile can have its own code to determine what way
            to face and what asset to spawn.
          </p>
          <img src="/assets/projects/dpts/2.jpg" class="w-full" />
          <p>
            A major hurdle I knew I'd have to figure out was dealing with different sized buildings upon generation. In the picture below you can see that the
            buildings overlap because every tile is spawning a building. My solution is to store the game object when its generated for every tile it overlaps
            so that when I go to spawn a new building I can check if something already exists there. This took more effort to get working than I care to admit.
          </p>
          <img src="/assets/projects/dpts/3.jpg" class="w-full" />
          <p>
            Below is right after I got different sized building generation working. Since I only have a 2x1 "industrial" building as of right now, some tiles
            are empty as the game doesn't know of anything that will fit there.
          </p>
          <img src="/assets/projects/dpts/4.jpg" class="w-full" />
          <p>
            Now that I have seperate generators for each of the zones, I went back and updated my road generation which allowed me to add in intersections. I
            also updated the road asset at this time to include sidewalks as I want to have a path for citizens to walk around on and I created a "commercial"
            store asset.
          </p>
          <img src="/assets/projects/dpts/5.jpg" class="w-full" />
        </div>

        <h2 class="font-heading mt-4 pb-1">Basic Road Networking</h2>
        <div class="space-y-4">
          <p>
            At this point I felt that I had enough of the town generator done that I could move onto my next big task: movement. The games core concept revolves
            around an automatic and dynamically created world so the next step is creating a way to move citizens around.
          </p>
          <p>
            I knew I had two options to choose from: some form of A* pathfinding using my current grid or switching to a Graph/Node based solution. I figured
            since the pathing for cars and people need to stick to just the roads and sidewalks that a Node solution would be much faster. This also gave me a
            chance to see how much I remembered from my freshman Computer Science 1 course... turns out not a lot.
          </p>
          <p>
            From here I started by converting all of my road tiles into a list of nodes. I then looped back through the list of nodes, getting their neighboring
            road tiles nodes and then adding them as an adjacent node. This leaves me with a very unoptimized graph where lots of nodes only have 2 adjacent
            neighbors, so I simplify the graph down so only nodes with 1 or 3+ neighbors exist. In the picture below I'm testing that my tile to node conversion
            works by implement the ability to click on a node (red cube) and have it draw its neighboring cells (green line) and also draw its neighbors
            neighboring cells (purple line).
          </p>
          <img src="/assets/projects/dpts/8.jpg" class="w-full" />
          <p>
            At this point I really wanted to start simulating some life so I decide to make cars drive on my road, which I used dijkstra's algorithm for
            pathfinding as not every node is the same distance apart. As of right now, my simplified graph would cause cars to drive off the road should the
            next node in its path not be in a straight line so I had to comment out my optimization function. To fix this, in the future I'm going to store all
            the possible tiles a node can reach between it and its neighboring nodes which gives me high level granularity to get near my target location, but
            then finer granularity to actually get to the objects destination.
          </p>
          <img src="/assets/projects/dpts/cars.gif" class="w-full" />
        </div>

        <h2 class="font-heading mt-4 pb-1">Main Menu And Sound</h2>
        <div class="space-y-4">
          <p>
            I decided to then take a break from programminga nd focus on other aspects of the game. I found a program called Boscia Ceoil for music making and
            started playing around. This then lead me to wanting to make a main menu and I knew I wanted to do something that wasn't static. I landed on having
            the camera rotate slowly around the temple and instead of just using an image for the game title I put each word on a different side of the temple.
          </p>

          <iframe
            class="aspect-video w-full"
            src="https://www.youtube.com/embed/DkDoi_uBKiA"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>

        <h2 class="font-heading mt-4 pb-1">Day Night Cycle</h2>
        <div class="space-y-4">
          <p>
            The next item on my list I decided to tackle was the Day/Night Cycle. This involved adding a clock, keeping track of what day it is and turning on
            lights at night. Both the cars and street lights need to correspond to the time of day. To make it look more realistic as well, each light source
            will turn on/off at a random offset. With this as soon as it becomes dark, it takes some time for all the street lights and car headlights to turn
            on which is more realistic.
          </p>
          <img src="/assets/projects/dpts/9.jpg" class="w-full" />
        </div>

        <h2 class="font-heading mt-4 pb-1">Building Randomization</h2>
        <div class="space-y-4">
          <p>
            I wanted to make the town feel more unique without having a ton of models. To do this I decided to make a few models with components that could be
            turned on and off to make them slightly different. This included everything from landscaping to porches to dormers on the roof. To do this I created
            a specific hiearchy in the model itself, and then in code I could randomly select 1 or more of those features to render. I'm very happy with how
            this system turned out as its simple and helps keep my models organized.
          </p>
          <p>
            I also added in color randomization to each building. With this I just loop through all of the materials in the game object and depending on the
            material name, I randomly select a new material. I can specify the material name to look for and the list of colors that it can be set to.
          </p>
          <img src="/assets/projects/dpts/10.jpg" class="w-full" />
          <img src="/assets/projects/dpts/11.jpg" class="w-full" />
          <img src="/assets/projects/dpts/12.jpg" class="w-full" />
          <img src="/assets/projects/dpts/13.jpg" class="w-full" />
          <img src="/assets/projects/dpts/14.jpg" class="w-full" />
          <img src="/assets/projects/dpts/15.jpg" class="w-full" />
          <img src="/assets/projects/dpts/17.jpg" class="w-full" />
          <img src="/assets/projects/dpts/18.jpg" class="w-full" />
          <img src="/assets/projects/dpts/19.jpg" class="w-full" />
          <img src="/assets/projects/dpts/20.jpg" class="w-full" />
          <img src="/assets/projects/dpts/21.jpg" class="w-full" />
          <img src="/assets/projects/dpts/22.jpg" class="w-full" />
          <img src="/assets/projects/dpts/23.jpg" class="w-full" />
          <img src="/assets/projects/dpts/24.jpg" class="w-full" />
          <img src="/assets/projects/dpts/25.jpg" class="w-full" />
          <img src="/assets/projects/dpts/26.jpg" class="w-full" />
          <img src="/assets/projects/dpts/27.jpg" class="w-full" />
          <img src="/assets/projects/dpts/28.jpg" class="w-full" />
          <img src="/assets/projects/dpts/29.jpg" class="w-full" />
          <img src="/assets/projects/dpts/30.jpg" class="w-full" />
          <img src="/assets/projects/dpts/31.jpg" class="w-full" />
          <img src="/assets/projects/dpts/32.jpg" class="w-full" />
          <img src="/assets/projects/dpts/33.jpg" class="w-full" />
          <img src="/assets/projects/dpts/34.jpg" class="w-full" />
          <img src="/assets/projects/dpts/35.jpg" class="w-full" />
          <img src="/assets/projects/dpts/36.jpg" class="w-full" />
          <img src="/assets/projects/dpts/37.jpg" class="w-full" />
        </div>

        <h2 class="font-heading mt-4 pb-1">Teaser Trailer</h2>
        <div class="space-y-4">
          <iframe
            class="aspect-video w-full"
            src="https://www.youtube.com/embed/vcf-8XMdwUk"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>

        <h2 class="font-heading mt-4 pb-1">Game Release Trailer</h2>
        <div class="space-y-4">
          <iframe
            class="aspect-video w-full"
            src="https://www.youtube.com/embed/pWwiQhjo6zA"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;
  }
}

export { PageProjects };
