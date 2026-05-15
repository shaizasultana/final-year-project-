const express = require("express");
const router = express.Router();

const ACTIVITIES = [
  { id: "1", type: "breathing", title: "Box breathing", mood: "any", steps: ["Inhale 4", "Hold 4", "Exhale 4", "Hold 4"] },
  { id: "2", type: "grounding", title: "5-4-3-2-1 grounding", mood: "fear", steps: ["5 things you see", "4 you feel", "3 you hear", "2 you smell", "1 you taste"] },
  { id: "3", type: "journal", title: "3 good things", mood: "sad", steps: ["Write 3 good things from today", "Why they happened", "How you helped"] },
  { id: "4", type: "release", title: "Anger release plan", mood: "anger", steps: ["Step away 2 minutes", "Unclench jaw/shoulders", "Cold water on wrists", "Name the feeling"] },
  { id: "5", type: "boost", title: "Mini gratitude", mood: "happy", steps: ["List 3 things you appreciate", "Send one kind message to someone"] },
  {id:"6",   type:"movement", title:"4 minutes of movment",mood:"sad", steps:["4 minutes of movment run on the spot,jump,shake,dance like no one is watching"]},
  {id:"7", type:"sing",title:"singing",mood:("sad","anger"),steps:["sing a song as loud as you can write a song"]},
{id:"8", type:"draw",title:"darwing",mood:("sad","anger"),steps:["get plain paper any colour and any tootles and show you creativity side draw animals scribble anything you feel like it"]}
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

router.get("/list", (req, res) => {
  const mood = (req.query.mood || "any").toLowerCase();
  const filtered = ACTIVITIES.filter(
    (a) => a.mood === mood || a.mood === "any"
  );
  res.json({ activities: filtered });
});

module.exports = router;