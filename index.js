/* global ngapp, xelib */
registerPatcher({
    info: info,
    gameModes: [xelib.gmTES5, xelib.gmSSE],
    settings: {
        label: 'Projectile Tweaker',
        templateUrl: `${patcherUrl}/partials/settings.html`,
        defaultSettings: {
            GravMult: 0.5,
            SpeedMult: 2.0
        }
    },
    execute: function(patch, helpers, settings, locals) {
        return {
            initialize: function(patch, helpers, settings, locals) {
                locals.count = 0;
            },
            process: [{
                load: {
                    signature: 'PROJ',
                    filter: function(record) {
                        return xelib.GetValue(record, "DATA\\Type") == "Arrow";
                    }
                },
                patch: function(record, helpers, settings, locals) {
                    let oldGrav = parseFloat(xelib.GetValue(record, "DATA\\Gravity"));
                    let oldSped = parseFloat(xelib.GetValue(record, "DATA\\Speed"));
                    xelib.SetValue(record, "DATA\\Gravity", String(oldGrav*settings.GravMult))
                    xelib.SetValue(record, "DATA\\Speed", String(oldSped*settings.SpeedMult))
                    locals.count ++
                }
            }],
            finalize: function(patchfile, helpers, settings, locals) {
                helpers.logMessage("Patched "+locals.count + " Projectiles")
            }
        }
    }
});
