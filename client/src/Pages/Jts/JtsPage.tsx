import { AnimatedPage } from "@/Components/AnimatedPage/AnimatedPage";
import { SEO } from "@/Components/SEO/SEO";

const PRIVACY_POLICY_URLS = {
  promptQueue: "/promptqueue-privacy",
  sorqa: "/sorqa-privacy",
} as const;

const JtsPage = () => {
  return (
    <>
      <SEO
        appendSiteName={false}
        canonicalUrl="https://yosefhayimsabag.com/jts"
        description="Josrade OAuth application: purpose, scopes, and data access disclosure for Joseph Sabag's Chrome extensions."
        title="Josrade — OAuth App Information"
        url="/jts"
      />

      <AnimatedPage className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 text-left sm:px-6 md:py-12">
        <article className="w-full space-y-7">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Josrade
            </h1>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              Josrade is the publisher account behind a suite of Chrome
              extensions and Cloudflare Worker APIs by Joseph Sabag. The Josrade
              OAuth application is configured under Google Cloud project
              270038006281 and is the publisher name shown on the Google sign-in
              consent screen used by these extensions.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Purpose of the Josrade OAuth app
            </h2>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              The Josrade OAuth client lets end-users sign in to Joseph
              Sabag&apos;s Chrome extensions with their Google account so each
              extension can offer per-account features (saved prompts, queues,
              transcripts, sync). Authentication is brokered by a Cloudflare
              Worker backend at promptqueue-api.yosefisabag.workers.dev.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Scopes requested and why
            </h2>
            <ul className="list-disc space-y-3 pl-5 text-base leading-7 text-[var(--text-secondary)]">
              <li>
                <code className="break-words text-[var(--text-primary)]">
                  openid email profile
                </code>{" "}
                — identifies the signed-in user (email, name, avatar) so the
                extension can attach saved data to the correct account.
              </li>
              <li>
                <code className="break-all text-[var(--text-primary)]">
                  https://www.googleapis.com/auth/chromewebstore
                </code>{" "}
                — used only by the developer&apos;s publishing CLI to upload new
                versions of the developer&apos;s own extensions to the Chrome
                Web Store. End-users of the extensions never see this scope.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Data the Josrade OAuth app does NOT access
            </h2>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              Josrade does not request and never accesses Google Drive, Gmail,
              Google Photos, Google Calendar, Contacts, or any other user data
              outside the basic profile fields above. The extensions are not
              connected to user files, mailboxes, or personal Google content of
              any kind.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Chrome extensions published under Josrade
            </h2>
            <ul className="list-disc space-y-3 pl-5 text-base leading-7 text-[var(--text-secondary)]">
              <li>
                Prompt Queue — bulk image generation and prompt automation for
                Google Gemini.
              </li>
              <li>
                Sora Auto Queue Prompts — automated prompt queuing for OpenAI
                Sora video generation.
              </li>
              <li>
                Audio Transcriber — in-browser audio transcription helper.
              </li>
              <li>
                AI Conversation Navigator — navigation and search across long AI
                chat threads.
              </li>
            </ul>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              Privacy is documented per-extension. See for example the{" "}
              <a
                className="text-[var(--text-primary)] underline decoration-[#05df72]/60 underline-offset-4 hover:text-[#7ff7af]"
                href={PRIVACY_POLICY_URLS.promptQueue}
              >
                Prompt Queue privacy policy
              </a>{" "}
              and{" "}
              <a
                className="text-[var(--text-primary)] underline decoration-[#05df72]/60 underline-offset-4 hover:text-[#7ff7af]"
                href={PRIVACY_POLICY_URLS.sorqa}
              >
                Sorqa privacy policy
              </a>
              .
            </p>
          </section>
        </article>
      </AnimatedPage>
    </>
  );
};

export default JtsPage;
