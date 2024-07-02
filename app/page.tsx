"use client";

import { Container } from "@/components/container";
import { Background } from "@/components/background";
import withCustomCursor from "@/components/withCustomCursor";
import {Heading} from "@/components/heading";
import {Subheading} from "@/components/subheading";
import {Solution1} from "@/components/solution1";
import {Solution2} from "@/components/solution2";
import {TracingBeam} from "@/components/ui/tracing-beam";

const ContainerWithCursor = withCustomCursor(Container);

export default function Home() {
    return (
        <div className="relative overflow-hidden">
            <Background />
            <ContainerWithCursor className="flex min-h-screen flex-col items-center justify-between">
                <div className="relative z-20 py-10 md:pt-20 backdrop-blur-lg">
                    <Heading as="h1">SE Technical Test Responses</Heading>
                    <Subheading className="text-center">
                        Please see below for functional solutions to tasks 1 and 2. Built using Next.js (App router, v14), TailwindCSS/ReactMarkdown for styling, and Axios as our HTTP client for sending requests to external APIs (DHL's API, in this case).
                    </Subheading>
                    <Subheading className="text-center">
                        Built by: Dobson Dunavant
                    </Subheading>
                </div>
                <TracingBeam className="px-6">
                    <Solution1/>
                    <Solution2/>
                </TracingBeam>
            </ContainerWithCursor>
        </div>
    );
}
