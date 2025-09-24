<?php
/**
 * Plugin Name: StylMetal Send Question Endpoint
 * Description: Exposes a REST endpoint that collects zapytania produktowe and sends notification emails.
 * Version:     1.0.0
 * Author:      StylMetal
 */

if (!defined('ABSPATH')) {
    exit;
}

class StylMetal_Send_Question_Endpoint {
    private const REST_NAMESPACE = 'stylmetal/v1';
    private const REST_ROUTE = '/send-question';

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_route']);
        add_action('rest_api_init', [$this, 'register_cors_headers'], 15);
    }

    public function register_route(): void {
        register_rest_route(
            self::REST_NAMESPACE,
            self::REST_ROUTE,
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [$this, 'handle_request'],
                'permission_callback' => '__return_true',
                'args'                => $this->get_args_definition(),
            ]
        );
    }

    public function register_cors_headers(): void {
        add_filter('rest_pre_serve_request', function ($value) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            return $value;
        });
    }

    private function get_args_definition(): array {
        return [
            'firstName'  => [
                'required'          => true,
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'lastName'   => [
                'required'          => true,
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'phone'      => [
                'required'          => true,
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'email'      => [
                'required'          => true,
                'sanitize_callback' => 'sanitize_email',
                'validate_callback' => 'is_email',
            ],
            'message'    => [
                'required'          => true,
                'sanitize_callback' => 'sanitize_textarea_field',
            ],
            'productName' => [
                'required'          => false,
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ];
    }

    public function handle_request(WP_REST_Request $request) {
        $data = [
            'first_name'  => $request->get_param('firstName'),
            'last_name'   => $request->get_param('lastName'),
            'phone'       => $request->get_param('phone'),
            'email'       => $request->get_param('email'),
            'message'     => $request->get_param('message'),
            'productName' => $request->get_param('productName'),
        ];

        if (!$data['email'] || !is_email($data['email'])) {
            return new WP_Error(
                'stylmetal_invalid_email',
                __('Nieprawidlowy adres e-mail.', 'stylmetal'),
                ['status' => 400]
            );
        }

        $recipient = "jaroslawmatusiak124@gmail.com"
        $subject   = __('Nowe zapytanie o produkt StylMetal', 'stylmetal');
        $body      = $this->build_email_body($data);
        $headers   = [
            'Content-Type: text/plain; charset=UTF-8',
            sprintf('Reply-To: %s <%s>', trim($data['first_name'] . ' ' . $data['last_name']), $data['email']),
        ];

        $sent = wp_mail($recipient, $subject, $body, $headers);

        if (!$sent) {
            return new WP_Error(
                'stylmetal_mail_failed',
                __('Wyslanie wiadomosci nie powiodlo sie. Sprobuj ponownie pozniej.', 'stylmetal'),
                ['status' => 500]
            );
        }

        return new WP_REST_Response([
            'success' => true,
            'message' => __('Zapytanie zostalo wyslane.', 'stylmetal'),
        ], 200);
    }

    private function build_email_body(array $data): string {
        $lines = [
            'Nowe zapytanie o produkt StylMetal:',
            '',
            sprintf('Imie: %s', $data['first_name']),
            sprintf('Nazwisko: %s', $data['last_name']),
            sprintf('Telefon: %s', $data['phone']),
            sprintf('E-mail: %s', $data['email']),
        ];

        if (!empty($data['productName'])) {
            $lines[] = sprintf('Produkt: %s', $data['productName']);
        }

        $lines[] = '';
        $lines[] = 'Wiadomosc:';
        $lines[] = $data['message'];
        $lines[] = '';
        $lines[] = sprintf('Wyslano: %s', current_time('Y-m-d H:i'));

        return implode("\n", $lines);
    }
}

new StylMetal_Send_Question_Endpoint();
