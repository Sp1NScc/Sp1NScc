import { navItems, profile } from "../data/content";

type Props = {
  floating: boolean;
  active: string;
};

export function SiteHeader({ floating, active }: Props) {
  return (
    <header className={`site-header${floating ? " is-floating" : ""}`}>
      <div className="site-header__inner container">
        <a className="brand" href="#home" aria-label="贾蕙铭 — 回到首页">
          <span className="brand__logo" aria-hidden="true" />
          <span className="brand__name">贾蕙铭</span>
        </a>

        <nav className="nav" aria-label="主导航">
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className={`nav__link${active === item.id ? " is-active" : ""}`}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  <span className="nav__index mono">{item.index}</span>
                  <span className="nav__label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a className="header-mail mono" href={profile.emailHref}>
            {profile.email}
          </a>
          <a className="header-cta" href="#contact">
            联系我
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
