import { Client } from "@gradio/client";
import translate from "translate";

const client = await Client.connect("fancyfeast/joy-caption-alpha-two");
const captions = `
Just here for the LOLs
Cant even with todays adulting
Sleep is just a time travel to breakfast
Not all heroes wear capes some just hold the camera
Trying to find my motivation like
Mondays the sequel no one asked for
Sending this selfie to NASA because Im a star
Stress level Kanye at an award show
Is it too late for coffee or too early for wine
Not to brag but I dont even need alcohol to make bad decisions
404 Error Motivation not found

Squad goals
Oops I did it again
Cant even
Just peachy
Oh snap
Nailed it
I woke up like this
Whats not to love
This is fine
Monday mood
Fri nally
Zero chill
Sigh
Who dis
That escalated quickly
Adulting
Send help
YOLO
Not today satan
Savage mode on
Just dropped my new skincare routine called Unprecedented Times
Im not lazy Im on energy saving mode
Monday has been canceled go back to sleep
Relationship status cuddling with my WiFi router
Trying to get my life together but Im more of a gatherer
My spirit animal is a sloth with WiFi access
Not all superheroes wear capes some just have a phone charger
Warning I could burst into song at any moment
Im not arguing Im just explaining why Im right
I dont sweat I sparkle especially during a workout
Adulting is like folding a fitted sheet
Ive got 99 memes but a joke aint one
Just wing it Me about life eyeliner everything
Decided to go on a diet now my headphones fit better
Life status Currently holding it all together with a single bobby pin
I came I saw I made it awkward
Some call it fashion I call it comfort with a hint of despair
Legend has it the mute button on video calls was a gift from the gods
My wallet is like an onion opening it makes me cry
Alexa skip to the weekend

Do I run Yes out of patience money and time
Sassy classy and a bit smart assy
Might delete later but just need to show off this outfit
My lifes a mess but my memes Masterpieces
Relationship status committed to inner peace
Spilling tea and justifying it as hydrating
More issues than Vogue but still front cover material
Adulting is soup and I am a fork
When life shuts a door open it again Its a door Thats how they work
`;

translate.engine = "google";

export async function createCaption(image: File) {
  const result = await client.predict("/stream_chat", {
    input_image: image,
    caption_type: "Descriptive (Informal)",
    caption_length: "30",
    extra_options: [
      "Do NOT include anything sexual; keep it PG.",
      "Do NOT mention the image's resolution.",
    ],
    name_input: "",
    custom_prompt:
      "You are a clever and slightly chaotic meme creator with a sharp sense of humor. Look at this image and imagine you're writing a short, hilarious, and punchy meme caption. It should be something that makes people laugh instantly — like a tweet, a reaction, or a sarcastic thought — but it must be no longer than 30 characters. Think Gen Z humor meets absurd observations. Use slang, irony, or pop culture if needed. Now, go ahead and drop the funniest short caption you can think of. DO NOT AT ALL COST JUST DESCRIBE THE IMAGE, TRY sometimes TO START THE CAPTION SAYING THINGS LIKE 'When...'. Do not add # or hashtags, get inspired in these popular meme captions:  " +
      captions,
  });
  const text = await translate((result.data as string)[1], {
    from: "en",
    to: "es",
  });

  return text;
}
