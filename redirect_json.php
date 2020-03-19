<?php
$api_key = 'YOURKEYHERE';
$geo_json = @file_get_contents( 'https://api.ipstack.com/'. $_SERVER['REMOTE_ADDR'] .'?access_key='. $api_key .'&format=1' );
$geo = @json_decode( $geo_json );
$country_code = ( !empty( $geo->{'country_code'} ) ? $geo->{'country_code'} : false );

$redirect_data = array(
  'country_code' => $country_code,
);

echo json_encode($redirect_data);
?>
