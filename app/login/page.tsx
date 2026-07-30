import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="loginShell">
      <section className="loginBrandPanel" aria-label="TAM Asset Management">
        <div className="loginBrandInner">
          <img
            className="loginLogo"
            src="/tam-logo-white.png"
            alt="TAM Asset Management"
          />
          <div className="loginIntroduction">
            <p className="eyebrow">Client portal</p>
            <h1>Your investments, clearly in view.</h1>
            <p>
              Secure access to your portfolio valuations, performance and
              investment updates.
            </p>
          </div>
          <p className="loginBrandFooter">
            TAM Asset Management · Client valuation service
          </p>
        </div>
      </section>

      <section className="loginFormPanel">
        <div className="loginFormWrap">
          <div className="loginMobileBrand">
            <img
              src="/tam-logo-white.png"
              alt="TAM Asset Management"
            />
          </div>
          <p className="eyebrow darkEyebrow">Welcome back</p>
          <h2>Sign in to your account</h2>
          <p className="loginLead">
            Enter demonstration credentials to view the sample valuation.
          </p>
          <LoginForm />
          <div className="demoNotice">
            <span aria-hidden="true">i</span>
            <p>
              <strong>Demonstration login</strong>
              Do not enter real account credentials. This preview does not send
              or store the username or password.
            </p>
          </div>
          <p className="loginHelp">
            In a live service, account recovery and support would be connected
            here.
          </p>
        </div>
      </section>
    </main>
  );
}
