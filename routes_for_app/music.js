const express = require("express");
const router = express.Router();

router.get("/Sad", async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    if (!clientId) return res.status(500).json({ error: "Missing JAMENDO_CLIENT_ID" });

   
    const params = new URLSearchParams({
      client_id: clientId,
      format: "json",
      limit: "12",
      order: "popularity_total",
      tags: "happy",
      audiodl: "true",        
      imagesize: "600",      
    });

    const url = `https://api.jamendo.com/v3.0/tracks/?${params.toString()}`;

    const r = await fetch(url);
    const data = await r.json();

    
    const results = Array.isArray(data.results) ? data.results : [];

    // DEBUG: send some useful info back (remove later)
    // console.log("Jamendo response:", JSON.stringify(data, null, 2));

    const tracks = results.map((t) => ({
      id: t.id,
      name: t.name,
      artist: t.artist_name,
      image: t.image,
      audio: t.audio,       // may exist
      shareUrl: t.shareurl,
    }));

    res.json({
      mood: "happy",
      count: tracks.length,
      tracks,
      // debug fields (helpful while testing)
      jamendo_headers: data.headers || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch happy tracks" });
  }
});


router.get("/fear", async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    if (!clientId) return res.status(500).json({ error: "Missing JAMENDO_CLIENT_ID" });

    const params = new URLSearchParams({
      client_id: clientId,
      format: "json",
      limit: "12",
      order: "popularity_total",
      tags: "happy",
      audiodl: "true",
      imagesize: "600",
    });

    const url = `https://api.jamendo.com/v3.0/tracks/?${params.toString()}`;

    const r = await fetch(url);
    const data = await r.json();

    const results = Array.isArray(data.results) ? data.results : [];

    const tracks = results.map((t) => ({
      id: t.id,
      name: t.name,
      artist: t.artist_name,
      image: t.image,
      audio: t.audio,
      shareUrl: t.shareurl,
    }));

    res.json({ mood: "fear", count: tracks.length, tracks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch fear tracks" });
  }
});

module.exports = router;