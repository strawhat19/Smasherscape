import * as React from 'react';
import { useContext } from "react";
import { Badge } from '@mui/material';
import Player from '../models/Player';
import { StateContext } from '../pages/_app';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import useAutocomplete, { AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, getActivePlayers, getCharacterTitle } from './smasherscape';
import PlayerOption from './PlayerOption';
import PlayerHookTag from './PlayerHookTag';

const Root = styled(`div`)(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
);

const InputWrapper = styled(`div`)(
  ({ theme }) => `
  width: 100%;
  flex-direction: row;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background: #141414;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  option: any;
  label: string;
  player: Player;
}

function Tag(props: TagProps) {
  const { option, player, label, onDelete, ...other } = props;
  let playerOption = option;
  return (
    // <PlayerOption key={playerOption.id} playerOption={playerOption} {...other} />
    <PlayerHookTag key={playerOption.id} playerOption={playerOption} onDelete={onDelete} other={other}  />
  );
}

// background: ${
//   theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
// };
const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  column-gap: 15px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 15px 0 10px;
  outline: 0;
  overflow: hidden;

  background: var(--smasherscapeBlue);
  color: white;
  border-radius: 8px;
  border: 2px solid black;
  min-height: 30px;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    min-width: fit-content;
    text-overflow: ellipsis;
  }

  & i {
    cursor: pointer;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled(`ul`)(
  ({ theme }) => `
  width: 95%;
  max-width: 400px;
  margin: 50px 0 0;
  padding: 1em 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 350px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    transition: var(--transition);
    flex-direction: row;
    border-radius: 8px;
    padding: 5px 12px;
    margin: 0 auto;
    display: flex;
    width: 95%;

    &:hover {
      background: #d7d7d7 !important;
    }

    width: 100%

    & span {
      flex-grow: 1;
      min-width: fit-content;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background: var(--smasherscapeBlue) !important;
    color: white !important;
    font-weight: 600;

    &:hover {
      filter: brightness(1.15);
    }

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function CustomizedHook(props) {
  const { players, playersToSelect, setPlayersToSelect } = useContext<any>(StateContext);

  const adjustPlayersToSelect = (e: any, val: any) => {
    // console.log(`adjustPlayersToSelect`, {e, val});
    setPlayersToSelect(val);
  }

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
    getClearProps,
    // limitTags,
  } = useAutocomplete({
    multiple: true,
    defaultValue: [],
    id: `players-search-complete`,
    options: getActivePlayers(players),
    getOptionLabel: (option) => option.label,
    onChange: (e, val: any) => adjustPlayersToSelect(e, val),
    isOptionEqualToValue: (option, value) => option.id === value.id,
    // limitTags: 2,
  });

  return (
    <Root className={`customHookRoot`}>
      <div {...getRootProps()} className={`customHookRootProps`}>
        <div className={`playerHookInputWrapper`}>
          <div className="playerHookInputBG"></div>
          <InputWrapper className={`customHookRoot ${focused ? `focused` : ``}`} ref={setAnchorEl}>
            {value.filter(v => playersToSelect.map(plyr => plyr.name).includes(v.name)).map((option: any, index: number) => (
              <StyledTag {...getTagProps({ index })} label={option.label} player={option} option={option} />
            ))}
            <input className={`playerHookInput`} placeholder={`Start Typing or Click Here to Enter Player(s) to Delete`} {...getInputProps()} />
            <i style={{width: 20, cursor: `pointer`}} className="fas fa-times clearAllTagsIcon" {...getClearProps()}></i>
          </InputWrapper>
        </div>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox className={`customHookListBox`} {...getListboxProps()}>
          {(groupedOptions).map((option, index) => 
            (
              <li className={`customHookOption`} key={index} {...getOptionProps({ option, index })}>
                <PlayerOption playerOption={option}  />
                {/* <div>
                  <div className="autocompleteOption">
                    <div className="levelNumColumn">Lv {option?.level?.num}</div>
                    <div className="levelImageColumn"><img width={30} src={calcPlayerLevelImage(option?.level?.name)} alt={option?.level?.name} /></div>
                    <div className="playerDetailsColumn">
                      <div className="playerName">{option?.name}</div>
                      <div className="playerEXP">Exp: {option?.experience?.arenaXP}</div>
                      <div className="plays">
                        <div className={`playsContainer`}>
                          {calcPlayerCharactersPlayed(option).map((char, charIndex) => {
                            return (
                              <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(option, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(option, char)} color="primary">
                                <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </li>
            )
          )}
        </Listbox>
      ) : null}
    </Root>
  );
}