rm -rf build;
node intro-music.js;
cd build;
nesasm start.s && open start.nes;
