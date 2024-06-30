import MaxWidth from "@/components/shared/max-width";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <section>
        <MaxWidth className="pb-24 pt-8 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-10 xl:gap-x-8 xl:pt-14">
          <div className="px-6 lg:col-span-2 lg:px-0 lg:pt-4">
            <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="relative mt-10 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                <span className="px-2 text-emerald-600">Journaling</span>{" "}
                Simplified
              </h1>
              <p className="mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10 lg:text-left">
                WordGen is an online journaling platform designed to help you
                reflect on your past, understand your present, and plan for your
                future. Unlock your thoughts and capture your moments with ease.
              </p>

              <div className="mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start">
                <ul className="space-y-2">
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-emerald-600" />
                    Easy to use interface
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-emerald-600" />
                    Secure and private journaling
                  </li>
                </ul>
              </div>

              <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/jurnal"
                    className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-white transition duration-300 hover:bg-emerald-600/80"
                  >
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-white transition duration-300 hover:bg-emerald-600/80"
                  >
                    About us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </MaxWidth>
      </section>

      <section className="bg-slate-100 py-24">
        <MaxWidth className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
            <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
              Comments from our
              <span className="relative px-2">users </span>{" "}
            </h2>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
              </div>

              <div className="text-large leading-8">
                <p>
                  &quot;WordGen has completely transformed my daily routine. The
                  intuitive design and thoughtful features make journaling a
                  pleasure.
                  <span className="bg-emerald-800 p-0.5 text-white">
                    I&apos;ve never been so consistent
                  </span>
                  with my entries before. Upgrading to the premium subscription
                  was the best decision; the extra features are definitely worth
                  it!.&quot;
                </p>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
              </div>

              <div className="text-large leading-8">
                <p>
                  &quot;As someone who struggles with anxiety, WordGen has been
                  a lifesaver. The app&apos;s clean interface and ease of use make it
                  simple to jot down my thoughts anytime, anywhere. Highly
                  recommend!&quot;
                </p>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
              </div>

              <div className="text-large leading-8">
                <p>&quot;Love it!!&quot;</p>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <Star className="h-5 w-5 fill-emerald-600 text-emerald-600" />
              </div>

              <div className="text-large leading-8">
                <p>
                  &quot;WordGen is the{" "}
                  <span className="bg-emerald-800 p-0.5 text-white">best</span>{" "}
                  journaling app I’ve ever used. &quot;
                </p>
              </div>
            </div>
          </div>
        </MaxWidth>
      </section>

      <section>
        <MaxWidth className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 text-balance text-center text-2xl font-bold !leading-tight tracking-tight text-gray-900 md:text-4xl">
                Write
                <span className="relative px-2 text-emerald-600">
                  1,000
                </span>{" "}
                characters daily for Free. Upgrade to Premium for
                <span className="relative px-2 text-emerald-600">
                  unlimited
                </span>
                room to write. It&apos;s that simple.
              </h2>
            </div>
          </div>

          <div className="mt-8 flex w-full items-center justify-center">
            <Link
              href="/auth/login"
              className="flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-white transition duration-300 hover:bg-emerald-600/80"
            >
              Start journaling now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </MaxWidth>
      </section>
    </div>
  );
}
