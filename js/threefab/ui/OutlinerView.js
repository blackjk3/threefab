/**
 * @class THREEFAB.OutlinerView
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Setup outliner view.
 *
 */


THREEFAB.OutlinerView = Backbone.View.extend({
	
	el: $('<li class="list-hierarchy"></li>'),
  data: [],
  $tree: null,
  $title: null,

	initialize: function() {

		_.bindAll(this);
		
		this.el = $(this.el);

		$.subscribe( THREEFAB.Events.VIEWPORT_OBJECT_ADDED, this.objectAdded );
		$.subscribe( THREEFAB.Events.VIEWPORT_OBJECT_REMOVED, this.objectRemoved );
		
		$.subscribe( THREEFAB.Events.VIEWPORT_MESH_SELECTED, this.updateSelected );
		$.subscribe( THREEFAB.Events.VIEWPORT_LIGHT_SELECTED, this.updateSelected );

    this.$tree = $('#tree');
    this.$tree.tree({
      autoOpen: false,
      dragAndDrop: true,
      selectable: true,
      onCreateLi: function( node, $li ) {
        // Add 'icon' span before title
        $li.find('div').prepend('<span class="icon-eye heirarchy-icon"></span><span class="icon-locked heirarchy-icon"></span>');
      }
    });

    this.$tree.on( 'tree.move', this.movedNode );
    this.$tree.on( 'tree.click', this.clickedNode );
    
    this.$title = $('.hierarchy-container .title');
    this.$title.on( 'click', this.toggleVisibility );
	},

	render: function( event, scene ) {
		this.resetOptions( scene.children );
	},

  toggleVisibility: function() {
   
    this.$tree.toggle();
   
    if ( this.$title.hasClass('closed') ) {
      this.$title.removeClass('closed');
    } else {
      this.$title.addClass('closed');
    }
  },

	change: function() {

		$.publish( THREEFAB.Events.OUTLINER_CHANGED, this.select.val() );
	},

  clickedNode: function( event ) {
    
    var target = event.capturedTarget,
        klass = target[0].className;
        node = event.node;

    if ( klass === 'jqtree-title' ) {
      // The clicked node is 'event.node'
      
      this.$tree.tree('selectNode', node, true);
      $.publish( THREEFAB.Events.OUTLINER_CHANGED, node.name );
    } else if ( klass.search( 'icon-eye' ) !== -1 ) {
      $.publish( THREEFAB.Events.OUTLINER_VISIBLE, [node.name, this.getVisibleToggle( target )] );
    } else if ( klass.search( 'icon-locked' ) !== -1 ) {
      $.publish( THREEFAB.Events.OUTLINER_LOCKED, [node.name, this.getLockedToggle( target )] );
    }
    
  },

  getVisibleToggle: function( target ) {
    if ( target.css('opacity') === '1' ) {
      
      target.css({ opacity: '0.5' });
      return false;
    }

    target.css({ opacity: '1' });
    return true;
  },

  getLockedToggle: function( target ) {
    if ( target.css('opacity') === '0.5' ) {
      
      target.css({ opacity: '1' });
      return true;
    }

    target.css({ opacity: '0.5' });
    return false;
  },

  movedNode: function( event ) {
    $.publish( THREEFAB.Events.OUTLINER_PARENT_CHANGED, event );
  },

	updateSelected: function( event, object ) {
		
		var name = object.name,
        node = this.$tree.tree( 'getNodeById', name );

    if ( node ) {
      this.$tree.tree( 'selectNode', node, true );
    }
	},

  clearData: function() {
    this.data = [];
  },

	resetOptions: function( children ) {

		var opt;
		
    this.clearData();

		for(var i=0, len = children.length; i < len; i++) {
		
			if(children[i].name && children[i].name !== 'THREE.PointLight' && children[i].name !== 'THREE.SpotLight' && children[i].name !== 'THREE.AmbientLight') {

        this.data.push({
          id: children[i].name,
          label: children[i].name
        });
			}

		}

    this.$tree.tree( 'loadData', this.data );
	},

  objectAdded: function( event, object ) {
    this.$tree.tree( 'appendNode', {
      label: object.name,
      id: object.name
    });
  },

  objectRemoved: function( event, object ) {
    var node = this.$tree.tree( 'getNodeById', object.name );
    this.$tree.tree( 'removeNode', node );
  }

});