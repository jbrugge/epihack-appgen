var fs = require('fs')
    , path = require('path')
    , _ = require('underscore')
    , EJS = require('ejs');



exports.createStaticFiles = function(siteData, targetPath, templatePath) {

  var listTemplate = EJS.compile(fs.readFileSync(path.join(templatePath, "list.ejs"), {encoding: 'utf8'}));
  var detailTemplate = EJS.compile(fs.readFileSync(path.join(templatePath, "detail.ejs"), {encoding: 'utf8'}));

  transform();

  function transform() {
    _.each(siteData.pages, function(page) {
      var html = '';
      var targetFile = path.join(targetPath, page.id + ".html");
      if (page.type === "list") {

        html = listTemplate({
          page: page,
          pageMap: siteData.pageMap
        });

      } else {

        html = detailTemplate(page);

      }

      fs.writeFileSync(targetFile, html, {encoding: 'utf8'});
    });
  }
};

exports.copy = function(siteData, src, tgt) {

  copyTemplate(src, tgt);

  function copyTemplate(source, target) {
  if ( fs.lstatSync( source ).isDirectory() ) {
    files = fs.readdirSync( source );
    files.forEach( function ( file ) {
      var curSource = path.join( source, file );
      if ( fs.lstatSync( curSource ).isDirectory() ) {
        var targetFolder = path.join(target, path.basename(curSource));
        if ( !fs.existsSync( targetFolder ) ) {
          fs.mkdirSync( targetFolder );
        }
        copyTemplate( curSource, targetFolder );
      } else {
        copy( curSource, target);
      }
    });
  } else {
    copy(source, target);
  }

  function copy(source, target) {
    if (path.extname(source) === ".ejs") {
      var fileName = path.basename(source);
      var finalFileName = fileName.substring(0, fileName.length - 4)
      var finalTargetName = path.join(target, finalFileName);

      var content = fs.readFileSync(source, {encoding: 'utf8'});
      var template = EJS.compile(content);
      var html = template(siteData);

      fs.writeFileSync(finalTargetName, html, {encoding: 'utf8'});

    } else {

      copyFileSync(source, target);

    }
  }


  function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
        targetFile = path.join( target, path.basename( source ) );
      }
    }

    var txt = fs.readFileSync(source, {encoding: 'utf8'});
    fs.writeFileSync(targetFile, txt, {encoding: 'utf8'});
  }
}


}
