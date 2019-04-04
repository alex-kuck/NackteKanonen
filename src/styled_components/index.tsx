import styled from "@emotion/styled";

export const OverviewGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-template-areas: "logo"
                        "info";
  justify-items: center;
  align-items: center;
  
  @media only screen and (min-width: 980px ) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "logo info";
  }
`;

export const PlayersGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  @media only screen and (min-width: 700px ) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 980px ) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PlayerGridExpanded = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-items: center;
  
  background: linear-gradient(-225deg, darkred, black);
  color: #f2f2f2;
  grid-row: span 3;
  cursor: pointer;
  user-select: none;
  border-radius: 1.5rem;
  padding: .5rem;
  border: .2rem darkred outset;
`;

export const PlayerGridCollapsed = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto;
  grid-column-gap: .5rem;
  grid-template-areas: "avatar info";
  align-items: center;
  
  & h2 {
    margin: .5rem 0;
  }
  cursor: pointer;
  user-select: none;
  border-radius: 1.5rem;
  padding: .5rem;
  border: .2rem darkred outset;
  color: darkred;
`;

export const AvatarSmall = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  grid-area: avatar;
  align-self: center;
`;

export const AvatarLarge = styled.img`
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
`;

export const Logo = styled.img`
  border-radius: 50%;
  width: 15rem;
  height: 15rem;
`;

export const TextCentered = styled.span`
  text-align: center;
`;

export const CrossedOut = styled.span`
  text-decoration: line-through;
`;

export const Bold = styled.span`
  font-weight: bold;
`;