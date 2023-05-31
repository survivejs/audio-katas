# Kata 1 - Getting started

The purpose of this kata is to get a basic environment set up and the first piece of user interface in place. It is also about getting used to working in a kata way. The difficulty will ramp up soon enough.

The reference implementation for the katas has been implemented using vanilla DOM with a helper library or two. That said, you can use a proper UI framework instead if you are more comfortable with that approach. Especially Web Audio facing portions will be similar although likely some of the handling will be slightly different due to abstraction added by frameworks.

## Learning aims

The idea here is to get acquainted with the Web Audio API and get a development environment going:

* Bootstrapping a Parcel application, optionally with Tailwind for styling
* Creating a basic abstraction for draggable windows as the actual functionality of the DAW will be built within these

## Task

Complete the following:

1. Bootstrap a [Parcel](https://parceljs.org/) application on your computer. [See Tailwind documentation](https://tailwindcss.com/docs/guides/parcel) for individual steps. You can also include Tailwind at this point if you prefer to use it for styling.
2. Set up an abstraction for draggable windows. The window should have a header that accepts a name and there should be space for content where we can add controls. If you go with plain DOM, I recommend using a helper like [dragjs](https://bebraw.github.io/dragjs/) for the dragging portion.
