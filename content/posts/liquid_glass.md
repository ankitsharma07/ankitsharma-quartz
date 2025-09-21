---
title: Liquid Glass Buttons
date: 2025-09-21
tags:
  - SwiftUI
  - iOS
  - Liquid Glass
---

Apple released Liquid Glass with iOS 26.0 back in June at [WWDC 2025](https://developer.apple.com/videos/play/wwdc2025/101). This is one of the major redesign that Apple has introduced since they went `flat design` with iOS 7.0.

Standard system components like NavigationStack, titleBar and toolBar and can take advantage of the new design and redefine how one uses iOS or other Apple platforms.

In this blog post, I am addressing `glass` and `glassEffect` and how they can be used with buttons, texts and images.

## GlassEffect
- Applying Liquid Glass is as easy as adding `glassEffect(_:in:isEnabled:` modifier.
- This renders a shape behind the anchor with Liquid Glass.
- By default, the `regular` variant of glass is applied to the anchor.

## GlassEffect Customization
- Change the shape by applying the `shape` parameter.
- Apply `tint` to the glass.
- Add `interactive` to make them react to touch and pointer interactions.

> In buttons, we can apply `.buttonStyle(.glass)` directly, instead of using `.glassEffect()`.

An example
``` swift
import SwiftUI

struct GlassView: View {

    var body: some View {
        NavigationStack {
            Form {
                Section("No Liquid Glass") {
                    LabeledContent("None") {
                        Button("A Button") {

                        }
                    }
                    LabeledContent("Borderless") {
                        Button("A Button") {

                        }
                        .buttonStyle(.borderless)
                    }
                    LabeledContent("Plain") {
                        Button("A Button") {

                        }
                        .buttonStyle(.plain)
                    }
                    LabeledContent("Bordered") {
                        Button("A Button") {

                        }
                        .buttonStyle(.bordered)
                    }
                    LabeledContent("Prominent") {
                        Button("A Button") {

                        }
                        .buttonStyle(.borderedProminent)
                    }
                }

                Section("Liquid Glass Buttons") {
                    LabeledContent("Glass") {
                        Button("A Button") {

                        }
                        .buttonStyle(.glass)
                    }
                    LabeledContent("Glass Prominent") {
                        Button("A Button") {

                        }
                        .buttonStyle(.glassProminent)
                    }
                }

            }

            Text("Hello, Liquid!")
                .font(.largeTitle)
                .padding()
                .glassEffect(.clear)

            HStack {
                Image(systemName: "checkmark")
                    .font(.system(size: 36))
                    .frame(width: 80, height: 80)
                    .glassEffect(.clear)


                Image(systemName: "checkmark")
                    .font(.system(size: 36))
                    .frame(width: 80, height: 80)
                    .glassEffect(.clear.interactive())
                    .onTapGesture {
                        // do
                    }
            }

            HStack {
                Button {

                } label: {
                    Image(systemName: "checkmark")
                        .font(.system(size: 36))
                        .frame(width: 80, height: 80)
                }
                .buttonStyle(.glass)

                Button {

                } label: {
                    Image(systemName: "checkmark")
                        .font(.system(size: 36))
                        .frame(width: 80, height: 80)
                }
                .buttonStyle(.plain)
                .glassEffect(.clear.interactive().tint(.blue.opacity(0.5)))

            }

        }
    }
}

#Preview {
    GlassView()
}
```

This outputs glass effect across buttons, texts and images.
![liquid glass](https://imagedelivery.net/06-B5E8Pho0XzEZbQK4Mmw/7fa355f8-83f6-4a44-20a6-541a7ffb1200/public)


## References
- [Glass Button Style](https://developer.apple.com/documentation/swiftui/glassbuttonstyle)
- [Applying Liquid Glass to Custom Views](https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views)
- [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
