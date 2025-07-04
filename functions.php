<?php

// register styles and js
add_action('wp_enqueue_scripts', function() {
  
  // styles
  wp_enqueue_style('twentytwentyfive-child-style', get_stylesheet_uri(), ['twentytwentyfive-style'], wp_get_theme()->get('Version'));

  // javascript
  wp_enqueue_script('twentytwentyfive-child-scripts', get_stylesheet_directory_uri() . '/assets/js/scripts.js', [], '1.0', true);

  //localize script
  wp_localize_script(
    'twentytwentyfive-child-scripts', 
    'bookAjax', 
    [
      'rest_url' => esc_url_raw(rest_url('wp/v2/book/')),
      'current_book_id' => get_the_ID(),
    ]
  );
});

// Register CPT and Taxonomy
function custom_post_type_books() {
    // Register CPT: Books
    $cpt_labels = array(
        'name'               => _x('Books', 'Post Type General Name', 'twentytwentyfive-child'),
        'singular_name'      => _x('Book', 'Post Type Singular Name', 'twentytwentyfive-child'),
        'menu_name'          => __('Books', 'twentytwentyfive-child'),
        'name_admin_bar'     => __('Book', 'twentytwentyfive-child'),
        'add_new'            => __('Add New', 'twentytwentyfive-child'),
        'add_new_item'       => __('Add New Book', 'twentytwentyfive-child'),
        'edit_item'          => __('Edit Book', 'twentytwentyfive-child'),
        'new_item'           => __('New Book', 'twentytwentyfive-child'),
        'view_item'          => __('View Book', 'twentytwentyfive-child'),
        'search_items'       => __('Search Books', 'twentytwentyfive-child'),
        'not_found'          => __('No books found', 'twentytwentyfive-child'),
        'not_found_in_trash' => __('No books found in Trash', 'twentytwentyfive-child'),
    );

    $cpt_args = array(
        'label'               => __('Books', 'twentytwentyfive-child'),
        'labels'              => $cpt_labels,
        'public'              => true,
        'has_archive'         => true,
        'rewrite'             => array('slug' => 'library'),
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest'        => true,
    );
    register_post_type('book', $cpt_args);

    // Register taxonomy: Genre
    $taxonomy_labels = array(
        'name'              => _x('Genres', 'taxonomy general name', 'twentytwentyfive-child'),
        'singular_name'     => _x('Genre', 'taxonomy singular name', 'twentytwentyfive-child'),
        'search_items'      => __('Search Genres', 'twentytwentyfive-child'),
        'all_items'         => __('All Genres', 'twentytwentyfive-child'),
        'edit_item'         => __('Edit Genre', 'twentytwentyfive-child'),
        'update_item'       => __('Update Genre', 'twentytwentyfive-child'),
        'add_new_item'      => __('Add New Genre', 'twentytwentyfive-child'),
        'new_item_name'     => __('New Genre Name', 'twentytwentyfive-child'),
        'menu_name'         => __('Genre', 'twentytwentyfive-child'),
    );

    $taxonomy_args = array(
        'hierarchical'      => true,
        'labels'            => $taxonomy_labels,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'book-genre'),
    );

    register_taxonomy('genre', 'book', $taxonomy_args);
}
add_action('init', 'custom_post_type_books');

// add genre_details field to rest
function add_genre_names_to_books() {
  register_rest_field(
    'book',
    'genre_details',
    [
      'get_callback' => function( $post ) {
        $terms = get_the_terms($post['id'], 'genre');

        if (empty($terms) || is_wp_error($terms)) {
          return [];
        }

        //return terms details if ok
        return $terms;
      },
      'schema' => null
    ]
  );
}
add_action('rest_api_init', 'add_genre_names_to_books');

//register pattern
function twentytwentyfive_child_register_block_patterns() {
    $pattern_file = get_stylesheet_directory() . '/patterns/template-query-loop-book.php';

    if (file_exists($pattern_file)) {
        $content = file_get_contents($pattern_file);

        register_block_pattern(
            'twentytwentyfive-child/template-query-loop-book',
            array(
                'title'       => __('Query Loop for Books', 'twentytwentyfive-child'),
                'description' => __('New pattern', 'twentytwentyfive-child'),
                'categories'  => array('query'),
                'content'     => $content,
            )
        );
    }
}
add_action('init', 'twentytwentyfive_child_register_block_patterns');