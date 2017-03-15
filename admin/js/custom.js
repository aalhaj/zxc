$(function() {
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'upload-categ-img', // you can pass in id...
        container: document.getElementById('category-image'), // ... or DOM Element itself
        url: "../upload.php",
        flash_swf_url : 'http://rawgithub.com/moxiecode/moxie/master/bin/flash/Moxie.cdn.swf',
    		silverlight_xap_url : 'http://rawgithub.com/moxiecode/moxie/master/bin/silverlight/Moxie.cdn.xap',
        filters: {
            max_file_size: '10mb',
            mime_types: [{
                title: "Image files",
                extensions: "jpg,gif,png"
            }, ]
        },
        multipart_params: {
          targetUrl: CATEGORIES_DIR,
        },
        init: {
            PostInit: function() {
                /*  document.getElementById('filelist').innerHTML = '';

                  document.getElementById('uploadfiles').onclick = function() {
                      uploader.start();
                      return false;
                  };*/
            },

            FilesAdded: function(up, files) {
                /*plupload.each(files, function(file) {
                    document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                });*/
                $('#category-img-field').val(files[0].name);
                $.each(files, function(file) {
                    var img = new mOxie.Image();
                    img.onload = function() {
                        $('#category-form-img canvas').remove();
                        this.embed($('#category-form-img').get(0), {
                            width: 150,
                            height: 150,
                        });
                    };
                    img.onembedded = function() {
                        this.destroy();
                    };

                    img.onerror = function() {
                        this.destroy();
                    };
                    img.load(this.getSource());
                });

            },

            UploadProgress: function(up, file) {
                //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            },

            Error: function(up, err) {
                //document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
            }
        }
    });

    $('#upload-categ-img').data('uploader',uploader);
    $('#upload-categ-img').data('uploader').init();
    $('#upload-categ-img').data('uploader').bind('BeforeUpload',function(up, file) {
      if('thumb' in file){
          up.settings.url = '../upload/upload.php?thumbnail=true';
      }else{
          up.settings.url = '../upload/upload.php?thumbnail=false';
      }
    });
    $('#upload-categ-img').data('uploader').bind('FileUploaded',function(up, file) {
      if(!('thumb' in file)) {
        file.thumb = true;
        file.loaded = 0;
        file.percent = 0;
        file.status = plupload.QUEUED;
        up.trigger("QueueChanged");
        up.refresh();
      }
    });

});
