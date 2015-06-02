<?php

	/*
		Plugin Name: Donbaler Recent Posts Widget
		Plugin URI: https://wordpress.org/plugins/donbaler-recent-posts-widget/
		Description: ابزارک نمایش آخرین ارسال‌های کاربر دنبالر ...
		Version: 1.3
		Author: Navid Shayesteh, Nima Saberi
		Author URI: http://ideyeno.ir
	*/

	class WP_donbaler extends WP_Widget {
		function WP_donbaler() {
			parent::WP_Widget(false, $name = 'ابزارک دنبالر');
		}
		function widget($args, $instance) {
			extract( $args );
			$username = apply_filters('widget_username', $instance['username']);
			$tedad = apply_filters('widget_tedad', $instance['tedad']);
			echo $args['before_widget'];
			echo $args['before_title'] . apply_filters( 'widget_title', (!empty($instance['title']) ? $instance['title'] : 'ابزارک دنبالر') ). $args['after_title'];
			echo '<script type="text/javascript">var donbaler_user = "'.esc_attr($username).'"; var donbaler_numpost = "'.intval($tedad).'";</script>';
			echo '<div id="donbaler_div"><div id="Donbaler_profile"></div><div id="Donbaler"><p></p></div><div class="clearfix"></div></div>';
			echo $args['after_widget'];
		}
		function update($new_instance, $old_instance) {
			$instance = $old_instance;
			$instance['username'] = strip_tags($new_instance['username']);
			$instance['tedad'] = strip_tags($new_instance['tedad']);
			return $instance;
		}
		function form($instance) {
			$username = esc_attr($instance['username']);
			$tedad = intval($instance['tedad']);
			$salida='<p>';
			$salida.='<label for="'.$this->get_field_id('username').'">نام کاربری :</label>';
			$salida.='<input class="widefat" id="'.$this->get_field_id('username').'" name="'.$this->get_field_name('username').'" type="text" value="'.(empty($username) ? 'donbaler' : $username).'" style="direction:ltr;text-align:left" /><br><small style="text-align: left;direction: ltr;width: 100%;float: left;margin-bottom: 10px;">http://donbaler.com/<b>username</b></small>';
			$salida.='</p>';
			$salida .='<p>';
			$salida.='<label for="'.$this->get_field_id('tedad').'">تعداد ارسالها :</label>';
			$salida.='<input class="widefat" id="'.$this->get_field_id('tedad').'" name="'.$this->get_field_name('tedad').'" type="text" value="'.($tedad < 1 ? '5' : $tedad).'" style="direction:ltr;text-align:left" />';
			$salida.='</p>';
			echo $salida;
		}
	}
	
	function donbaler_head(){
		wp_enqueue_script('donnbaler-widget-js', plugins_url('donbaler.js', __FILE__), array('jquery'), '1.3.3', true);
		wp_enqueue_style('donbaler-widget-css', plugins_url('donbaler.css', __FILE__), array(), '1.3.2', 'all');
	}
	
	add_action( 'wp_enqueue_scripts', 'donbaler_head' );
	add_action('widgets_init', create_function('', 'return register_widget("WP_donbaler");'));

?>