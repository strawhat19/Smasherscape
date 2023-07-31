import { Characters } from "./Characters";
export const calcPlayerCharacterIcon = (char) => {
    let publicAssetImageLink = `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters`;
    if (char == `aegis` || char == `pyra` || char == `mythra` || Characters[char] == Characters.Aegis || char == Characters.Aegis || char == Characters.Aegis.toLowerCase()) {
        return `${publicAssetImageLink}/PyraMythraAegis.webp`;
    } else if (char == `banjoandkazooie` || char == `banjo&kazooie` || char == `banjo` || char == `bk` || char == `bandk` || char == `b&k` || Characters[char] == Characters.BanjoAndKazooie || char == Characters.BanjoAndKazooie || char == Characters.BanjoAndKazooie.toLowerCase()) {
        return `${publicAssetImageLink}/Banjo&Kazooie.webp`;
    } else if (char == `bayonetta` || char == `bayo` || Characters[char] == Characters.Bayonetta || char == Characters.Bayonetta || char == Characters.Bayonetta.toLowerCase()) {
        return `${publicAssetImageLink}/Bayonetta.webp`;
    } else if (char == `bowser` || char == `bow` || Characters[char] == Characters.Bowser || char == Characters.Bowser || char == Characters.Bowser.toLowerCase()) {
        return `${publicAssetImageLink}/Bowser.webp`;
    } else if (char == `bowserjr` || char == `bj` || Characters[char] == Characters.BowserJr || char == Characters.BowserJr || char == Characters.BowserJr.toLowerCase()) {
        return `${publicAssetImageLink}/BowserJr.webp`;
    } else if (char == `byleth` || char == `by` || Characters[char] == Characters.Byleth || char == Characters.Byleth || char == Characters.Byleth.toLowerCase()) {
        return `${publicAssetImageLink}/Byleth.webp`;
    } else if (char == `captainfalcon` || char == `cf` || char == `falcon` || Characters[char] == Characters.CaptainFalcon || char == Characters.CaptainFalcon || char == Characters.CaptainFalcon.toLowerCase()) {
        return `${publicAssetImageLink}/CaptainFalcon.webp`;
    } else if (char == `charizard` || char == `char` || Characters[char] == Characters.Charizard || char == Characters.Charizard || char == Characters.Charizard.toLowerCase()) {
        return `${publicAssetImageLink}/Charizard.webp`;
    } else if (char == `chrom` || char == `ch` || Characters[char] == Characters.Chrom || char == Characters.Chrom || char == Characters.Chrom.toLowerCase()) {
        return `${publicAssetImageLink}/Chrom.webp`;
    } else if (char == `cloud` || char == `cl` || Characters[char] == Characters.Cloud || char == Characters.Cloud || char == Characters.Cloud.toLowerCase()) {
        return `${publicAssetImageLink}/Cloud.webp`;
    } else if (char == `corrin` || char == `co` || Characters[char] == Characters.Corrin || char == Characters.Corrin || char == Characters.Corrin.toLowerCase()) {
        return `${publicAssetImageLink}/Corrin.webp`;
    } else if (char == `daisy` || char == `da` || Characters[char] == Characters.Daisy || char == Characters.Daisy || char == Characters.Daisy.toLowerCase()) {
        return `${publicAssetImageLink}/Daisy.webp`;
    } else if (char == `darkpit` || char == `dp` || Characters[char] == Characters.DarkPit || char == Characters.DarkPit || char == Characters.DarkPit.toLowerCase()) {
        return `${publicAssetImageLink}/DarkPit.webp`;
    } else if (char == `darksamus` || char == `ds` || Characters[char] == Characters.DarkSamus || char == Characters.DarkSamus || char == Characters.DarkSamus.toLowerCase()) {
        return `${publicAssetImageLink}/DarkSamus.webp`;
    } else if (char == `diddykong` || char == `diddy` || Characters[char] == Characters.DiddyKong || char == Characters.DiddyKong || char == Characters.DiddyKong.toLowerCase()) {
        return `${publicAssetImageLink}/DiddyKong.webp`;
    } else if (char == `donkeykong` || char == `dk` || Characters[char] == Characters.DonkeyKong || char == Characters.DonkeyKong || char == Characters.DonkeyKong.toLowerCase()) {
        return `${publicAssetImageLink}/DonkeyKong.webp`;
    } else if (char == `drmario` || char == `doc` || char == `dm` || Characters[char] == Characters.DrMario || char == Characters.DrMario || char == Characters.DrMario.toLowerCase()) {
        return `${publicAssetImageLink}/DrMario.webp`;
    } else if (char == `duckhunt` || char == `dh` || Characters[char] == Characters.DuckHunt || char == Characters.DuckHunt || char == Characters.DuckHunt.toLowerCase()) {
        return `${publicAssetImageLink}/DuckHunt.webp`;
    } else if (char == `falco` || char == `fa` || Characters[char] == Characters.Falco || char == Characters.Falco || char == Characters.Falco.toLowerCase()) {
        return `${publicAssetImageLink}/Falco.webp`;
    } else if (char == `fox` || Characters[char] == Characters.Fox || char == Characters.Fox || char == Characters.Fox.toLowerCase()) {
        return `${publicAssetImageLink}/Fox.webp`;
    } else if (char == `ganondorf` || char == `ganon` || char == `gd` || char == `gnn` || Characters[char] == Characters.Ganondorf || char == Characters.Ganondorf || char == Characters.Ganondorf.toLowerCase()) {
        return `${publicAssetImageLink}/Ganondorf.webp`;
    } else if (char == `greninja` || char == `gren` || char == `grenin` || Characters[char] == Characters.Greninja || char == Characters.Greninja || char == Characters.Greninja.toLowerCase()) {
        return `${publicAssetImageLink}/Greninja.webp`;
    } else if (char == `hero` || char == `he` || char == `hr` || Characters[char] == Characters.Hero || char == Characters.Hero || char == Characters.Hero.toLowerCase()) {
        return `${publicAssetImageLink}/Hero.webp`;
    } else if (char == `iceclimbers` || char == `icies` || char == `ics` || char == `ic` || Characters[char] == Characters.IceClimbers || char == Characters.IceClimbers || char == Characters.IceClimbers.toLowerCase()) {
        return `${publicAssetImageLink}/IceClimbers.webp`;
    } else if (char == `ike` || Characters[char] == Characters.Ike || char == Characters.Ike || char == Characters.Ike.toLowerCase()) {
        return `${publicAssetImageLink}/Ike.webp`;
    } else if (char == `incineroar` || char == `incin` || char == `inc` || Characters[char] == Characters.Incineroar || char == Characters.Incineroar || char == Characters.Incineroar.toLowerCase()) {
        return `${publicAssetImageLink}/Incineroar.webp`;
    } else if (char == `inkling` || char == `inkl` || char == `ink` || Characters[char] == Characters.Inkling || char == Characters.Inkling || char == Characters.Inkling.toLowerCase()) {
        return `${publicAssetImageLink}/Inkling.webp`;
    } else if (char == `isabelle` || char == `isbl` || char == `isa` || Characters[char] == Characters.Isabelle || char == Characters.Isabelle || char == Characters.Isabelle.toLowerCase()) {
        return `${publicAssetImageLink}/Isabelle.webp`;
    } else if (char == `ivysaur` || char == `ivys` || char == `ivy` || Characters[char] == Characters.Ivysaur || char == Characters.Ivysaur || char == Characters.Ivysaur.toLowerCase()) {
        return `${publicAssetImageLink}/Ivysaur.webp`;
    } else if (char == `jigglypuff` || char == `jiggly` || char == `jiggs` || char == `jp` || Characters[char] == Characters.Jigglypuff || char == Characters.Jigglypuff || char == Characters.Jigglypuff.toLowerCase()) {
        return `${publicAssetImageLink}/Jigglypuff.webp`;
    } else if (char == `joker` || Characters[char] == Characters.Joker || char == Characters.Joker || char == Characters.Joker.toLowerCase()) {
        return `${publicAssetImageLink}/Joker.webp`;
    } else if (char == `kazuya` || char == `kaz` || char == `kz` || Characters[char] == Characters.Kazuya || char == Characters.Kazuya || char == Characters.Kazuya.toLowerCase()) {
        return `${publicAssetImageLink}/Kazuya.webp`;
    } else if (char == `ken` || char == `kn` || Characters[char] == Characters.Ken || char == Characters.Ken || char == Characters.Ken.toLowerCase()) {
        return `${publicAssetImageLink}/Ken.webp`;
    }  else if (char == `kingdedede` || char == `ddd` || char == `kd` || Characters[char] == Characters.KingDedede || char == Characters.KingDedede || char == Characters.KingDedede.toLowerCase()) {
        return `${publicAssetImageLink}/KingDedede.webp`;
    }  else if (char == `kingkrool` || char == `krool` || char == `rool` || char == `kkr` || Characters[char] == Characters.KingKRool || char == Characters.KingKRool || char == Characters.KingKRool.toLowerCase()) {
        return `${publicAssetImageLink}/KingKRool.webp`;
    } else if (char == `kirby` || char == `krb` || Characters[char] == Characters.Kirby || char == Characters.Kirby || char == Characters.Kirby.toLowerCase()) {
        return `${publicAssetImageLink}/Kirby.webp`;
    } else if (char == `link` || char == `lnk` || Characters[char] == Characters.Link || char == Characters.Link || char == Characters.Link.toLowerCase()) {
        return `${publicAssetImageLink}/Link.webp`;
    } else if (char == `littlemac` || char == `lm` || Characters[char] == Characters.LittleMac || char == Characters.LittleMac || char == Characters.LittleMac.toLowerCase()) {
        return `${publicAssetImageLink}/LittleMac.webp`;
    } else if (char == `lucario` || char == `luc` || Characters[char] == Characters.Lucario || char == Characters.Lucario || char == Characters.Lucario.toLowerCase()) {
        return `${publicAssetImageLink}/Lucario.webp`;
    } else if (char == `lucas` || Characters[char] == Characters.Lucas || char == Characters.Lucas || char == Characters.Lucas.toLowerCase()) {
        return `${publicAssetImageLink}/Lucas.webp`;
    } else if (char == `lucina` || Characters[char] == Characters.Lucina || char == Characters.Lucina || char == Characters.Lucina.toLowerCase()) {
        return `${publicAssetImageLink}/Lucina.webp`;
    } else if (char == `luigi` || char == `lg` || Characters[char] == Characters.Luigi || char == Characters.Luigi || char == Characters.Luigi.toLowerCase()) {
        return `${publicAssetImageLink}/Luigi.webp`;
    } else if (char == `mario` || Characters[char] == Characters.Mario || char == Characters.Mario || char == Characters.Mario.toLowerCase()) {
        return `${publicAssetImageLink}/Mario.webp`;
    } else if (char == `marth` || Characters[char] == Characters.Marth || char == Characters.Marth || char == Characters.Marth.toLowerCase()) {
        return `${publicAssetImageLink}/Marth.webp`;
    } else if (char == `megaman` || char == `mm` || char == `mega` || Characters[char] == Characters.MegaMan || char == Characters.MegaMan || char == Characters.MegaMan.toLowerCase()) {
        return `${publicAssetImageLink}/MegaMan.webp`;
    } else if (char == `metaknight` || char == `meta` || char == `mk` || Characters[char] == Characters.MetaKnight || char == Characters.MetaKnight || char == Characters.MetaKnight.toLowerCase()) {
        return `${publicAssetImageLink}/MetaKnight.webp`;
    } else if (char == `mt` || char == `mewtwo` || char == `m2` || Characters[char] == Characters.Mewtwo || char == Characters.Mewtwo || char == Characters.Mewtwo.toLowerCase()) {
        return `${publicAssetImageLink}/Mewtwo.webp`;
    } else if (char == `miibrawler` || char == `brawler` || char == `mb` || Characters[char] == Characters.MiiBrawler || char == Characters.MiiBrawler || char == Characters.MiiBrawler.toLowerCase()) {
        return `${publicAssetImageLink}/MiiBrawler.webp`;
    } else if (char == `miifighter` || char == `fighter` || char == `mf` || Characters[char] == Characters.MiiFighter || char == Characters.MiiFighter || char == Characters.MiiFighter.toLowerCase()) {
        return `${publicAssetImageLink}/MiiFighter.webp`;
    } else if (char == `miigunner` || char == `gunner` || char == `mg` || Characters[char] == Characters.MiiGunner || char == Characters.MiiGunner || char == Characters.MiiGunner.toLowerCase()) {
        return `${publicAssetImageLink}/MiiGunner.webp`;
    } else if (char == `miiswordfighter` || char == `swordfighter` || char == `ms` || Characters[char] == Characters.MiiSwordFighter || char == Characters.MiiSwordFighter || char == Characters.MiiSwordFighter.toLowerCase()) {
        return `${publicAssetImageLink}/MiiSwordfighter.webp`;
    } else if (char == `minmin` || char == `min` || Characters[char] == Characters.MinMin || char == Characters.MinMin || char == Characters.MinMin.toLowerCase()) {
        return `${publicAssetImageLink}/MinMin.webp`;
    } else if (char == `mrgame&watch` || char == `gnw` || char == `game&watch` || char == `mrgameandwatch` || char == `gameandwatch` || Characters[char] == Characters.MrGameAndWatch || char == Characters.MrGameAndWatch || char == Characters.MrGameAndWatch.toLowerCase()) {
        return `${publicAssetImageLink}/MrGame&Watch.webp`;
    } else if (char == `ness` || Characters[char] == Characters.Ness || char == Characters.Ness || char == Characters.Ness.toLowerCase()) {
        return `${publicAssetImageLink}/Ness.webp`;
    } else if (char == `olimar` || char == `oli` || Characters[char] == Characters.Olimar || char == Characters.Olimar || char == Characters.Olimar.toLowerCase()) {
        return `${publicAssetImageLink}/Olimar.webp`;
    } else if (char == `pacman` || char == `pac` || char == `pm` || Characters[char] == Characters.PacMan || char == Characters.PacMan || char == Characters.PacMan.toLowerCase()) {
        return `${publicAssetImageLink}/Pac-Man.webp`;
    } else if (char == `palutena` || char == `palu` || Characters[char] == Characters.Palutena || char == Characters.Palutena || char == Characters.Palutena.toLowerCase()) {
        return `${publicAssetImageLink}/Palutena.webp`;
    } else if (char == `peach` || char == `pe` || Characters[char] == Characters.Peach || char == Characters.Peach || char == Characters.Peach.toLowerCase()) {
        return `${publicAssetImageLink}/Peach.webp`;
    } else if (char == `pichu` || char == `pi` || Characters[char] == Characters.Pichu || char == Characters.Pichu || char == Characters.Pichu.toLowerCase()) {
        return `${publicAssetImageLink}/Pichu.webp`;
    } else if (char == `pikachu` || char == `pika` || Characters[char] == Characters.Pikachu || char == Characters.Pikachu || char == Characters.Pikachu.toLowerCase()) {
        return `${publicAssetImageLink}/Pikachu.webp`;
    } else if (char == `piranhaplant` || char == `plant` || char == `pp` || Characters[char] == Characters.PiranhaPlant || char == Characters.PiranhaPlant || char == Characters.PiranhaPlant.toLowerCase()) {
        return `${publicAssetImageLink}/PiranhaPlant.webp`;
    } else if (char == `pit` || Characters[char] == Characters.Pit || char == Characters.Pit || char == Characters.Pit.toLowerCase()) {
        return `${publicAssetImageLink}/Pit.webp`;
    } else if (char == `pokemontrainer` || char == `pt` || Characters[char] == Characters.PokemonTrainer || char == Characters.PokemonTrainer || char == Characters.PokemonTrainer.toLowerCase()) {
        return `${publicAssetImageLink}/PokémonTrainer.webp`;
    } else if (char == `richter` || char == `ri` || Characters[char] == Characters.Richter || char == Characters.Richter || char == Characters.Richter.toLowerCase()) {
        return `${publicAssetImageLink}/Richter.webp`;
    } else if (char == `ridley` || char == `rid` || Characters[char] == Characters.Ridley || char == Characters.Ridley || char == Characters.Ridley.toLowerCase()) {
        return `${publicAssetImageLink}/Ridley.webp`;
    } else if (char == `rob` || Characters[char] == Characters.ROB || char == Characters.ROB || char == Characters.ROB.toLowerCase()) {
        return `${publicAssetImageLink}/ROB.webp`;
    } else if (char == `robin` || char == `robi` || Characters[char] == Characters.Robin || char == Characters.Robin || char == Characters.Robin.toLowerCase()) {
        return `${publicAssetImageLink}/Robin.webp`;
    } else if (char == `rosalina&luma` || char == `rosalinaandluma` || char == `randl` || char == `rosa` || char == `r&l` || Characters[char] == Characters.RosalinaAndLuma || char == Characters.RosalinaAndLuma || char == Characters.RosalinaAndLuma.toLowerCase()) {
        return `${publicAssetImageLink}/Rosalina.webp`;
    } else if (char == `roy` || Characters[char] == Characters.Roy || char == Characters.Roy || char == Characters.Roy.toLowerCase()) {
        return `${publicAssetImageLink}/Roy.webp`;
    } else if (char == `ryu` || Characters[char] == Characters.Ryu || char == Characters.Ryu || char == Characters.Ryu.toLowerCase()) {
        return `${publicAssetImageLink}/Ryu.png`;
    } else if (char == `samus` || char == `samu` || Characters[char] == Characters.Samus || char == Characters.Samus || char == Characters.Samus.toLowerCase()) {
        return `${publicAssetImageLink}/Samus.webp`;
    } else if (char == `sephiroth` || char == `sephi` || char == `seph` || Characters[char] == Characters.Sephiroth || char == Characters.Sephiroth || char == Characters.Sephiroth.toLowerCase()) {
        return `${publicAssetImageLink}/Sephiroth.webp`;
    } else if (char == `sheik` || char == `she` || Characters[char] == Characters.Sheik || char == Characters.Sheik || char == Characters.Sheik.toLowerCase()) {
        return `${publicAssetImageLink}/Sheik.webp`;
    } else if (char == `shulk` || char == `shlk` || Characters[char] == Characters.Shulk || char == Characters.Shulk || char == Characters.Shulk.toLowerCase()) {
        return `${publicAssetImageLink}/Shulk.webp`;
    } else if (char == `simon` || char == `simo` || Characters[char] == Characters.Simon || char == Characters.Simon || char == Characters.Simon.toLowerCase()) {
        return `${publicAssetImageLink}/Simon.webp`;
    } else if (char == `snake` || char == `snk` || char == `ak` || Characters[char] == Characters.Snake || char == Characters.Snake || char == Characters.Snake.toLowerCase()) {
        return `${publicAssetImageLink}/Snake.webp`;
    } else if (char == `sonic` || char == `soni` || char == `snc` || Characters[char] == Characters.Sonic || char == Characters.Sonic || char == Characters.Sonic.toLowerCase()) {
        return `${publicAssetImageLink}/Sonic.webp`;
    } else if (char == `sora` || Characters[char] == Characters.Sora || char == Characters.Sora || char == Characters.Sora.toLowerCase()) {
        return `${publicAssetImageLink}/Sora.webp`;
    } else if (char == `steve` || char == `stev` || char == `ste` || char == `stv` || Characters[char] == Characters.Steve || char == Characters.Steve || char == Characters.Steve.toLowerCase()) {
        return `${publicAssetImageLink}/Steve.webp`;
    } else if (char == `terry` || char == `terr` || char == `trry` || char == `ter` || char == `try` || Characters[char] == Characters.Terry || char == Characters.Terry || char == Characters.Terry.toLowerCase()) {
        return `${publicAssetImageLink}/Terry.webp`;
    } else if (char == `toonlink` || char == `tlink` ||  char == `toon` || char == `tl` || Characters[char] == Characters.ToonLink || char == Characters.ToonLink || char == Characters.ToonLink.toLowerCase()) {
        return `${publicAssetImageLink}/ToonLink.webp`;
    } else if (char == `villager` || char == `vill` || Characters[char] == Characters.Villager || char == Characters.Villager || char == Characters.Villager.toLowerCase()) {
        return `${publicAssetImageLink}/Villager.webp`;
    } else if (char == `wario` || char == `war` || Characters[char] == Characters.Wario || char == Characters.Wario || char == Characters.Wario.toLowerCase()) {
        return `${publicAssetImageLink}/Wario.webp`;
    } else if (char == `wiifittrainer` || char == `wft` || char == `fit` || Characters[char] == Characters.WiiFitTrainer || char == Characters.WiiFitTrainer || char == Characters.WiiFitTrainer.toLowerCase()) {
        return `${publicAssetImageLink}/WiiFitTrainer.webp`;
    } else if (char == `wolf` || char == `wlf` || char == `wol` || Characters[char] == Characters.Wolf || char == Characters.Wolf || char == Characters.Wolf.toLowerCase()) {
        return `${publicAssetImageLink}/Wolf.webp`;
    } else if (char == `yoshi` || char == `yosh` || char == `ysh` || Characters[char] == Characters.Yoshi || char == Characters.Yoshi || char == Characters.Yoshi.toLowerCase()) {
        return `${publicAssetImageLink}/Yoshi.webp`;
    } else if (char == `younglink` || char == `ylink` || char == `yl` || Characters[char] == Characters.YoungLink || char == Characters.YoungLink || char == Characters.YoungLink.toLowerCase()) {
        return `${publicAssetImageLink}/YoungLink.webp`;
    } else if (char == `zelda` || char == `zeld` || char == `zel` || Characters[char] == Characters.Zelda || char == Characters.Zelda || char == Characters.Zelda.toLowerCase()) {
        return `${publicAssetImageLink}/Zelda.webp`;
    } else if (char == `zerosuitsamus` || char == `zerosuit` || char == `zero` || char == `zss` || Characters[char] == Characters.ZeroSuitSamus || char == Characters.ZeroSuitSamus || char == Characters.ZeroSuitSamus.toLowerCase()) {
        return `${publicAssetImageLink}/ZeroSuitSamus.webp`;
    }
}