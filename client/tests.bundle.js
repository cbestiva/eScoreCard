let context = require.context('./app/bundles/EScoreCard/components/', true, /.spec\.js?$/);
context.keys().forEach(context);