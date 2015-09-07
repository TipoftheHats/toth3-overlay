(function() {
    'use strict';

    var $panel = $bundle.filter('.dotafortress');
    var $drafters = $panel.find('.draft-picker');
    var $ban = $panel.find('.btn[command="ban"]');
    var $unban = $panel.find('.btn[command="unban"]');

    var players = nodecg.Replicant('df_players');
    players.on('change', function(oldVal, newVal) {
        $panel.find('select').html('');

        var draftable = newVal.filter(function(player) {
            return player.state === 'available' || player.state === 'drafted';
        });
        $panel.find('[data-set="draftable"]')
            .html('<option value="">-- Choose a player --</option>')
            .append(playersToOptGroups(draftable));

        // Set the selected players for the draftablekafiog jaiwerf fuck
        setDraftedPlayers();

        var banned = newVal.filter(function(player) {
            return player.state === 'banned';
        });
        $panel.find('[data-set="banned"]').html(playersToOptGroups(banned));

        var available = newVal.filter(function(player) {
            return player.state === 'available';
        });
        $panel.find('[data-set="available"]').html(playersToOptGroups(available));
    });

    var teams = nodecg.Replicant('df_teams');
    teams.on('change', function(oldVal, newVal) {
        // This is dumb and inefficient, but we have to check each player.
        players.value.forEach(function(player) {
            if (player.state !== 'drafted') return;

            var found = false;
            var allPlayers = newVal.red.concat(newVal.blu);
            allPlayers.some(function(p) {
                if (!p) return;
                if (p.name === player.name) {
                    found = true;
                    return true;
                }
            });

            if (!found) {
                player.state = 'available';
            }
        });

        setDraftedPlayers();
    });

    $drafters.on('change', function(e) {
        var team = e.target.getAttribute('data-team');
        var teamIndex = e.target.getAttribute('data-index');
        var playerName = e.target.value;

        if (playerName === '') {
            teams.value[team][teamIndex] = '';
        } else {
            var playerIndex;
            players.value.some(function(player, idx) {
                if (player.name === playerName) {
                    playerIndex = idx;
                    player.state = 'drafted';
                    return true;
                }
            });

            if (typeof playerIndex !== 'undefined') {
                teams.value[team][teamIndex] = players.value[playerIndex];
            }
        }
    });

    $ban.click(function() {
        var namesToBan = $panel.find('[data-id="ban_available"]').val();
        namesToBan.forEach(function(name) {
            players.value.some(function(player) {
                if (player.name === name) {
                    player.state = 'banned';
                    return true;
                }
            });
        });
    });

    $unban.click(function() {
        var namesToUnban = $panel.find('[data-id="ban_banned"]').val();
        namesToUnban.forEach(function(name) {
            players.value.some(function(player) {
                if (player.name === name) {
                    player.state = 'available';
                    return true;
                }
            });
        });
    });

    function playersToOptGroups(players) {
        var optGroups = [];

        var optGroupsByClass = {};
        players.forEach(function(player) {
            if (!optGroupsByClass[player.playerClass]) {
                optGroupsByClass[player.playerClass] = document.createElement('optgroup');
                optGroupsByClass[player.playerClass].label = player.playerClass;
            }

            var option = document.createElement('option');
            option.value = player.name;
            option.innerText = player.name;
            optGroupsByClass[player.playerClass].appendChild(option);
        });

        for (var className in optGroupsByClass) {
            if (optGroupsByClass.hasOwnProperty(className)){
                optGroups.push(optGroupsByClass[className]);
            }

        }

        return optGroups;
    }

    function setDraftedPlayers() {
        if (!teams.value) return;
        console.log('setting teams');

        teams.value.red.forEach(function(player, idx) {
            if (!player) return;
            $drafters.filter('[data-team="red"][data-index="' + idx + '"]').val(player.name);
        });

        teams.value.blu.forEach(function(player, idx) {
            if (!player) return;
            $drafters.filter('[data-team="blu"][data-index="' + idx + '"]').val(player.name);
        });
    }
})();