rm -rf build;
node wave-music.js;
cd build;
nesasm start.s && open start.nes;
