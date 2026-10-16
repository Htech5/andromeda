const HEAD = "[o]===[|]===[o]";

const TOP = `          .-----------------------------.
          |  ::                     ::  |
`;

const BOTTOM = `          |  ::                     ::  |
          '---+-----------------+-------'
             (o)               (o)
            /   |             /   |
           /    |            /    |
          |     |           |     |
          |     |           |     |
         _|_   _|_         _|_   _|_
        [___] [___]       [___] [___]`;

/**
 * ASCII robot. Real text inside <pre>, not a bitmap.
 * Accent spans are the only colored runs.
 */
export default function AsciiRobot() {
  return (
    <figure className="ascii">
      <pre className="ascii__art" aria-hidden="true">
        {"                  "}
        <span className="accent">{HEAD}</span>
        {"\n"}
        {TOP}
        {"          |  ::    "}
        <span className="accent">{"S A R / CORE"}</span>
        {"     ::  |\n"}
        {BOTTOM}
      </pre>
      <figcaption className="srOnly">
        Diagram ASCII robot berkaki Andromeda: badan persegi dengan dua modul
        sensor di atas, empat kaki bersendi, dan telapak kaki di setiap ujung.
      </figcaption>
    </figure>
  );
}
