# Mobile Readability Tester

Load this page on your mobile or tablet device and fiddle with the knobs to adjust the information density and find optimal readability settings. Font family, font size, and container padding are adjustable. Line-height and paragraph bottom margin are both set to 1.5 to enforce a baseline grid.

The pixel height of the content area is displayed, as is the number of "pages" or screens on an iPhone that must be scrolled to view the entire content. (Assuming portrait mode and factoring out the URL bar, the visible viewport is 416px tall. So the pages calculation is just height/416.)	 

## Demo
[View Test Page](http://robflaherty.github.com/mobile-readability-tester/)

## Plugin Usage

Load jquery.readability.js into your website, and call the readability function around your container element.

`` $('#content').readability(); ``

## License
WTFPL

