---
title: Musings 3
date: 2025-06-20
---

June is the most exciting month for me. Every year Apple organises its World
Wide Developer Conference (WWDC) in June. I am a big Apple fan, been watching
these since 2014 and now its almost 11 years and the level of excitement hasn't
changed a bit. Teenage Ankit is wondering what he got himself into.

This year, they announced a mix bag of things - [Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219), iPadOS is getting
proper windowing. MacOS is getting a new design and Spotlight got a lot of love.
The major missing block was any pre-mature announcement related to AI that they
did last year and are yet to deliver on that.

But, we got Apple Intelligence in Shortcuts and [Foundation Models](https://developer.apple.com/documentation/FoundationModels) API which runs
Apple's LLM locally on your devices. Developers can now make use of these
on-device models in their apps for free. This is huge. They also introduced
[PROSE](https://machinelearning.apple.com/research/predicting-preferences) (Preference Reasoning by Observing and Synthesizing Examples), the AI
builds an internal and interpretable profile for the user's actual writing
style.

The voice transcription is now insanely fast and more accurate. There is a new
[SpeechAnalyzer](https://developer.apple.com/videos/play/wwdc2025/277/?utm_source=perplexity) class. I may do a detailed analysis on this.

---

-   Apple released a new paper, "[The Illusion of Thinking](https://machinelearning.apple.com/research/illusion-of-thinking)" which tests reasoning models at extreme. Counter to
    this Claude Opus released a paper, "[The Illusion of Illusion of Thinking](https://arxiv.org/html/2506.09250v1)".
    This is a first time an LLM is writing a paper in defence.
-   Andrej Karpathy gave a talk. Senpai is back with a banger. [Software 3.0](https://youtu.be/LCEmiRjPEtQ)
-   We got ourselves into a situation. To build multi agents or to not. Both
    [cognition ai](https://cognition.ai/blog/dont-build-multi-agents) and [anthropic](https://www.anthropic.com/engineering/built-multi-agent-research-system) released a detailed post citing their reasons.
-   Simon Wilison did a 3h long presentation on [building software on top of an LLM](https://simonwillison.net/2025/May/15/building-on-llms/).
-   This is a good deep dive on [how you can use](https://nicholas.carlini.com/writing/2024/how-i-use-ai.html) the assistants in your daily
    developer life.
-   GCP was down due to a null pointer exception, [a detailed report](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW).
-   This is a [goldmine](https://peps.python.org/pep-0703/) in understanding how Python works under the hood, how
    systems works.
-   If you like to read about software and joy in writing that, here is a [piece](https://blog.jsbarretto.com/post/software-is-joy)
    that you should absolutely go through.
-   SIMD friendly [algorithms](http://0x80.pl/notesen/2016-11-28-simd-strfind.html) for substring searching, I was looking for algorithms
    which looks at the hardware and tries to optimize it to the maximum, I cam
    across this and it surely is a good read. Also, if you want to dig deeper into
    modern hardware algorithm optimization then this [online book](https://en.algorithmica.org/hpc/) is well suited.
-   Apple sneakingly released a [containarization](https://github.com/apple/containerization) application which can run linux
    on macOS.
-   I am getting more into local first sync, reading more about it. Found about
    [riffle systems](https://riffle.systems/essays/prelude).

I am getting better with this. But, there is a lot of room for improvement. The
coming musings will show. Slowly, and then all at once.
