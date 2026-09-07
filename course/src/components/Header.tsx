import type { ReactElement } from "react";

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps): ReactElement => <h1>{name}</h1>;

export default Header;
